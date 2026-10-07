import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { categories, tickets } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user?.role !== "ADMIN") {
    throw error(403, "Anda tidak memiliki akses ke halaman ini");
  }

  const categoriesData = await db.select().from(categories);

  return {
    categories: categoriesData,
  };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    if (locals.user?.role !== "ADMIN") {
      return fail(403, {
        error: "Anda tidak memiliki akses untuk menambah kategori.",
      });
    }

    const formData = await request.formData();
    const name = formData.get("name");

    if (typeof name !== "string" || name.trim() === "") {
      return fail(400, {
        error: "Nama kategori wajib diisi.",
      });
    }

    await db.insert(categories).values({
      name: name.trim(),
    });

    return {
      success: true,
    };
  },

  update: async ({ request, locals }) => {
    if (locals.user?.role !== "ADMIN") {
      return fail(403, {
        error: "Anda tidak memiliki akses untuk mengubah kategori.",
      });
    }

    const formData = await request.formData();

    const id = formData.get("id");
    const name = formData.get("name");

    if (typeof id !== "string" || typeof name !== "string") {
      return fail(400, {
        error: "Data kategori tidak valid.",
      });
    }

    if (name.trim() === "") {
      return fail(400, {
        error: "Nama kategori wajib diisi.",
      });
    }

    await db
      .update(categories)
      .set({
        name: name.trim(),
      })
      .where(eq(categories.id, Number(id)));

    return {
      success: true,
    };
  },

  delete: async ({ request, locals }) => {
    if (locals.user?.role !== "ADMIN") {
      return fail(403, {
        error: "Anda tidak memiliki akses untuk menghapus kategori.",
      });
    }

    const formData = await request.formData();
    const id = formData.get("id");

    if (typeof id !== "string") {
      return fail(400, {
        error: "ID kategori tidak valid.",
      });
    }

    const categoryId = Number(id);

    if (Number.isNaN(categoryId)) {
      return fail(400, {
        error: "ID kategori tidak valid.",
      });
    }

    const usedByTickets = await db
      .select({
        id: tickets.id,
      })
      .from(tickets)
      .where(eq(tickets.categoryId, categoryId))
      .limit(1);

    if (usedByTickets.length > 0) {
      return fail(400, {
        error:
          "Kategori tidak dapat dihapus karena masih digunakan oleh ticket.",
      });
    }

    await db.delete(categories).where(eq(categories.id, categoryId));

    return {
      success: true,
    };
  },
};
