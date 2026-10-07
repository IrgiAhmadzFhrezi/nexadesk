import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { departments, users } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user?.role !== "ADMIN") {
    throw error(403, "Anda tidak memiliki akses ke halaman ini");
  }

  const departmentsData = await db
    .select({
      id: departments.id,
      name: departments.name,
    })
    .from(departments);

  return {
    departments: departmentsData,
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (locals.user?.role !== "ADMIN") {
      throw error(403, "Anda tidak memiliki akses ke halaman ini");
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    const departmentId = formData.get("departmentId");

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof role !== "string" ||
      typeof departmentId !== "string"
    ) {
      return fail(400, {
        error: "Data form tidak valid.",
      });
    }

    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return fail(400, {
        error: "Email sudah digunakan.",
      });
    }
    
    const passwordHash = await argon2.hash(password);

    await db.insert(users).values({
      name,
      email,
      passwordHash,
      role,
      departmentId: Number(departmentId),
    });

    throw redirect(303, "/users");
  },
};
