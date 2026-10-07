import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import { categories, tickets } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw error(401, "Anda harus login terlebih dahulu.");
  }

  const categoriesData = await db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories);

  return {
    categories: categoriesData,
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      throw error(401, "Anda harus login terlebih dahulu.");
    }

    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const categoryId = formData.get("categoryId");
    const priority = formData.get("priority");

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof categoryId !== "string" ||
      typeof priority !== "string"
    ) {
      return fail(400, {
        error: "Data form tidak valid.",
      });
    }

    if (!title.trim() || !description.trim()) {
      return fail(400, {
        error: "Judul dan deskripsi wajib diisi.",
      });
    }

    const categoryIdNumber = Number(categoryId);

    if (Number.isNaN(categoryIdNumber)) {
      return fail(400, {
        error: "Category tidak valid.",
      });
    }

    const validPriorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

    if (!validPriorities.includes(priority)) {
      return fail(400, {
        error: "Priority tidak valid.",
      });
    }

    const category = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, categoryIdNumber))
      .limit(1);

    if (category.length === 0) {
      return fail(400, {
        error: "Category tidak ditemukan.",
      });
    }

    await db.insert(tickets).values({
      title: title.trim(),
      description: description.trim(),
      priority,
      requesterId: locals.user.id,
      departmentId: locals.user.departmentId,
      categoryId: categoryIdNumber,
    });

    throw redirect(303, "/tickets");
  },
};
