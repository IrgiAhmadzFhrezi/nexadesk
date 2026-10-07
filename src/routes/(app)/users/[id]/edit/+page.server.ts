import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import { departments, users } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (locals.user?.role !== "ADMIN") {
    throw error(403, "Anda tidak memiliki akses ke halaman ini");
  }

  const userId = Number(params.id);

  if (Number.isNaN(userId)) {
    throw error(400, "ID user tidak valid");
  }

  const userData = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      departmentId: users.departmentId,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userData.length === 0) {
    throw error(404, "User tidak ditemukan");
  }

  const departmentsData = await db
    .select({
      id: departments.id,
      name: departments.name,
    })
    .from(departments);

  return {
    user: userData[0],
    departments: departmentsData,
  };
};

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    if (locals.user?.role !== "ADMIN") {
      throw error(403, "Anda tidak memiliki akses ke halaman ini");
    }

    const userId = Number(params.id);

    if (Number.isNaN(userId)) {
      throw error(400, "ID user tidak valid");
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role");
    const departmentId = formData.get("departmentId");

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof role !== "string" ||
      typeof departmentId !== "string"
    ) {
      return fail(400, {
        error: "Data form tidak valid.",
      });
    }

    await db
      .update(users)
      .set({
        name,
        email,
        role,
        departmentId: Number(departmentId),
      })
      .where(eq(users.id, userId));

    throw redirect(303, "/users");
  },
};
