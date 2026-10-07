import type { Actions, PageServerLoad } from "./$types";
import { eq, desc } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db } from "$lib/server/db";
import {
  tickets,
  users,
  departments,
  categories,
  ticketComments,
  ticketActivities,
} from "$lib/server/db/schema";
import { redirect, fail, error } from "@sveltejs/kit";

type TicketStatus =
  | "OPEN"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "WAITING_USER"
  | "RESOLVED"
  | "CLOSED";

const requester = alias(users, "requester");
const assignee = alias(users, "assignee");

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user) {
    throw redirect(303, "/login");
  }
  const ticket = await db
    .select({
      id: tickets.id,
      title: tickets.title,
      description: tickets.description,
      createdAt: tickets.createdAt,
      status: tickets.status,
      solution: tickets.solution,
      priority: tickets.priority,
      requesterId: tickets.requesterId,
      requester: requester.name,
      assignedToId: tickets.assignedTo,
      assignedTo: assignee.name,
      department: departments.name,
      category: categories.name,
    })
    .from(tickets)
    .innerJoin(requester, eq(tickets.requesterId, requester.id))
    .leftJoin(assignee, eq(tickets.assignedTo, assignee.id))
    .innerJoin(departments, eq(tickets.departmentId, departments.id))
    .innerJoin(categories, eq(tickets.categoryId, categories.id))
    .where(eq(tickets.id, Number(params.id)));

  if (ticket.length === 0) {
    throw error(404, "Ticket tidak ditemukan");
  }
  if (
    locals.user.role === "EMPLOYEE" &&
    ticket[0].requesterId !== locals.user.id
  ) {
    throw error(403, "Anda tidak memiliki akses ke ticket ini");
  }
  const supportUsers = await db
    .select({
      id: users.id,
      name: users.name,
    })
    .from(users)
    .where(eq(users.role, "IT_SUPPORT"));

  const comments = await db
    .select({
      id: ticketComments.id,
      comment: ticketComments.comment,
      createdAt: ticketComments.createdAt,
      user: users.name,
    })
    .from(ticketComments)
    .innerJoin(users, eq(ticketComments.userId, users.id))
    .where(eq(ticketComments.ticketId, Number(params.id)));

  const activities = await db
    .select({
      id: ticketActivities.id,
      action: ticketActivities.action,
      createdAt: ticketActivities.createdAt,
      user: users.name,
    })
    .from(ticketActivities)
    .innerJoin(users, eq(ticketActivities.userId, users.id))
    .where(eq(ticketActivities.ticketId, Number(params.id)))
    .orderBy(desc(ticketActivities.createdAt));

  return {
    ticket: ticket[0],
    comments: comments,
    activities: activities,
    supportUsers: supportUsers,
    userRole: locals.user.role,
    userId: locals.user.id,

    canStartProgress:
      locals.user.role === "IT_SUPPORT" &&
      ticket[0].assignedToId === locals.user.id,

    canManageTicket:
      locals.user.role === "IT_SUPPORT" &&
      ticket[0].assignedToId === locals.user.id,

    canCloseTicket:
      locals.user.id === ticket[0].requesterId &&
      ticket[0].status === "RESOLVED",
  };
};

export const actions: Actions = {
  status: async ({ request, params, locals }) => {
    if (!locals.user) {
      throw redirect(303, "/login");
    }
    const formData = await request.formData();
    const status = formData.get("status");
    const assignedTo = formData.get("assignedTo");
    const solution = formData.get("solution");
    const currentUserId = locals.user.id;

    const validStatuses = [
      "OPEN",
      "ASSIGNED",
      "IN_PROGRESS",
      "WAITING_USER",
      "RESOLVED",
      "CLOSED",
    ];

    const allowedTransitions: Record<TicketStatus, TicketStatus[]> = {
      OPEN: ["ASSIGNED"],
      ASSIGNED: ["IN_PROGRESS"],
      IN_PROGRESS: ["WAITING_USER", "RESOLVED"],
      WAITING_USER: ["IN_PROGRESS"],
      RESOLVED: ["CLOSED"],
      CLOSED: [],
    };

    if (!validStatuses.includes(String(status))) {
      throw error(400, "Invalid status");
    }

    const ticket = await db
      .select({
        status: tickets.status,
        assignedTo: tickets.assignedTo,
        requesterId: tickets.requesterId,
      })
      .from(tickets)
      .where(eq(tickets.id, Number(params.id)));

    if (ticket.length === 0) {
      throw error(404, "Ticket tidak ditemukan");
    }

    if (status === "ASSIGNED") {
      if (locals.user.role !== "IT_SUPPORT" && locals.user.role !== "ADMIN") {
        return fail(403, {
          statusError:
            "Hanya IT Support atau Admin yang dapat melakukan assignment.",
        });
      }
      if (
        locals.user.role === "IT_SUPPORT" &&
        Number(assignedTo) !== currentUserId
      ) {
        return fail(403, {
          statusError:
            "IT Support hanya dapat mengambil ticket untuk dirinya sendiri.",
        });
      }
      const supportUser = await db
        .select({
          id: users.id,
          name: users.name,
          role: users.role,
        })
        .from(users)
        .where(eq(users.id, Number(assignedTo)));
      if (supportUser.length === 0 || supportUser[0].role !== "IT_SUPPORT") {
        return fail(400, {
          statusError: "User yang dipilih bukan IT Support",
        });
      }
    }

    const currentStatus = ticket[0].status as TicketStatus;

    const supportStatuses: TicketStatus[] = [
      "IN_PROGRESS",
      "WAITING_USER",
      "RESOLVED",
    ];

    if (supportStatuses.includes(status as TicketStatus)) {
      if (locals.user.role !== "IT_SUPPORT") {
        return fail(403, {
          statusError: "Hanya IT Support yang dapat mengubah status ticket.",
        });
      }

      if (ticket[0].assignedTo !== currentUserId) {
        return fail(403, {
          statusError: "Anda bukan IT Support yang ditugaskan untuk ticket ini",
        });
      }
    }

    if (status === "RESOLVED") {
      if (!solution || String(solution).trim() === "") {
        return fail(400, {
          statusError: "Solution wajib diisi sebelum ticket diselesaikan.",
        });
      }
    }

    if (status === "CLOSED") {
      if (currentStatus !== "RESOLVED") {
        return fail(400, {
          statusError: "Ticket harus berstatus RESOLVED sebelum ditutup.",
        });
      }

      if (ticket[0].requesterId !== currentUserId) {
        return fail(403, {
          statusError: "Hanya requester yang dapat menutup ticket ini.",
        });
      }
    }
    const allowedStatuses = allowedTransitions[currentStatus];

    if (!allowedStatuses || !allowedStatuses.includes(status as TicketStatus)) {
      return fail(400, {
        statusError: `Tidak dapat mengubah status dari ${currentStatus} ke ${String(status)}`,
      });
    }

    await db
      .update(tickets)
      .set({
        status: String(status),
        assignedTo: status === "ASSIGNED" ? Number(assignedTo) : undefined,
        solution: status === "RESOLVED" ? String(solution).trim() : undefined,
      })
      .where(eq(tickets.id, Number(params.id)));

    await db.insert(ticketActivities).values({
      ticketId: Number(params.id),
      userId: currentUserId,
      action: `Changed status from ${ticket[0].status} to ${String(status)}`,
    });

    throw redirect(303, `/tickets/${params.id}`);
  },

  comment: async ({ request, params, locals }) => {
    if (!locals.user) {
      throw redirect(303, "/login");
    }
    const ticket = await db
      .select({
        requesterId: tickets.requesterId,
      })
      .from(tickets)
      .where(eq(tickets.id, Number(params.id)));

    if (ticket.length === 0) {
      return fail(404, {
        commentError: "Ticket tidak ditemukan",
      });
    }

    if (
      locals.user.role === "EMPLOYEE" &&
      ticket[0].requesterId !== locals.user.id
    ) {
      return fail(403, {
        commentError: "Anda tidak memiliki akses ke ticket ini",
      });
    }
    const formData = await request.formData();
    const comment = formData.get("comment");
    if (!comment || String(comment).trim() === "") {
      return fail(400, {
        commentError: "Komentar wajib diisi",
      });
    }
    await db.insert(ticketComments).values({
      ticketId: Number(params.id),
      userId: locals.user.id,
      comment: String(comment),
    });

    await db.insert(ticketActivities).values({
      ticketId: Number(params.id),
      userId: locals.user.id,
      action: "Added a comment",
    });
    throw redirect(303, `/tickets/${params.id}`);
  },
};
