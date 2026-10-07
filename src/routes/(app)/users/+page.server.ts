import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { users, departments, tickets } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user?.role !== "ADMIN") {
    throw error(403, "Anda tidak memiliki akses ke halaman ini");
  }

  const usersData = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      department: departments.name,
    })
    .from(users)
    .innerJoin(departments, eq(users.departmentId, departments.id));

  return {
    users: usersData,
  };
};

export const actions: Actions = {
  delete: async ({ request, locals }) => {
    if (locals.user?.role !== "ADMIN") {
      throw error(403, "Anda tidak memiliki akses ke halaman ini");
    }

    const formData = await request.formData();

    const userId = formData.get("userId");

    if (typeof userId !== "string") {
      return fail(400, {
        error: "ID user tidak valid.",
      });
    }

    const id = Number(userId);

    if (Number.isNaN(id)) {
      return fail(400, {
        error: "ID user tidak valid.",
      });
    }

    const relatedTickets = await db
      .select({ id: tickets.id })
      .from(tickets)
      .where(eq(tickets.requesterId, id))
      .limit(1);

    if (relatedTickets.length > 0) {
      return fail(400, {
        error: "User tidak dapat dihapus karena masih memiliki ticket.",
      });
    }

    await db.delete(users).where(eq(users.id, id));

    return {
      success: true,
    };
  },
};
