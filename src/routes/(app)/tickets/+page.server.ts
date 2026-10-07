import { eq, desc, like, and, isNull } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { tickets, users, departments, categories } from "$lib/server/db/schema";

const assignedUser = alias(users, "assigned_user");

export const load: PageServerLoad = async ({ url, locals }) => {
  const search = url.searchParams.get("search")?.trim() ?? "";
  const status = url.searchParams.get("status")?.trim() ?? "";
  const priority = url.searchParams.get("priority")?.trim() ?? "";
  const category = url.searchParams.get("category")?.trim() ?? "";
  const view = url.searchParams.get("view")?.trim() ?? "";
  const isEmployee = locals.user?.role === "EMPLOYEE";
  const isMyTickets = locals.user?.role === "IT_SUPPORT" && view === "my";
  const isUnassigned =
    (locals.user?.role === "IT_SUPPORT" || locals.user?.role === "ADMIN") &&
    view === "unassigned";

  const categoriesData = await db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories);

  const ticketsData = await db
    .select({
      id: tickets.id,
      title: tickets.title,
      description: tickets.description,
      status: tickets.status,
      priority: tickets.priority,
      requester: users.name,
      department: departments.name,
      category: categories.name,
      assignedTo: assignedUser.name,
    })
    .from(tickets)
    .innerJoin(users, eq(tickets.requesterId, users.id))
    .innerJoin(departments, eq(tickets.departmentId, departments.id))
    .innerJoin(categories, eq(tickets.categoryId, categories.id))
    .leftJoin(assignedUser, eq(tickets.assignedTo, assignedUser.id))
    .where(
      and(
        isEmployee ? eq(tickets.requesterId, locals.user!.id) : undefined,
        isMyTickets ? eq(tickets.assignedTo, locals.user!.id) : undefined,
        isUnassigned ? isNull(tickets.assignedTo) : undefined,
        search ? like(tickets.title, `%${search}%`) : undefined,
        status ? eq(tickets.status, status) : undefined,
        priority ? eq(tickets.priority, priority) : undefined,
        category ? eq(tickets.categoryId, Number(category)) : undefined,
      ),
    );

  return {
    tickets: ticketsData,
    categories: categoriesData,
    search,
    status,
    priority,
    category,
    view,
    userRole: locals.user?.role,
  };
};
