import type { Actions, PageServerLoad } from "./$types";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { redirect, fail } from "@sveltejs/kit";
import { tickets, users, departments, categories } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ params }) => {
  const ticket = await db
    .select({
      id: tickets.id,
      title: tickets.title,
      description: tickets.description,
      status: tickets.status,
      priority: tickets.priority,
      requester: users.name,
      department: departments.name,
      departmentId: tickets.departmentId,
      category: categories.name,
      categoryId: tickets.categoryId,
    })
    .from(tickets)
    .innerJoin(users, eq(tickets.requesterId, users.id))
    .innerJoin(departments, eq(tickets.departmentId, departments.id))
    .innerJoin(categories, eq(tickets.categoryId, categories.id))
    .where(eq(tickets.id, Number(params.id)));

  const departmentsData = await db.select().from(departments);
  const categoriesData = await db.select().from(categories);

  return {
    ticket: ticket[0],
    departments: departmentsData,
    categories: categoriesData,
  };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const priority = formData.get("priority");
    const departmentId = formData.get("department");
    const categoryId = formData.get("category");

    if (!title || String(title).trim() === "") {
      return fail(400, {
        titleError: "Title wajib diisi",
      });
    }
    if (!description || String(description).trim() === "") {
      return fail(400, {
        descriptionError: "Description wajib diisi",
      });
    }
    const validPriorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];
    if (!validPriorities.includes(String(priority))) {
      return fail(400, {
        priorityError: "Invalid priority",
      });
    }

    const departmentIdNumber = Number(departmentId);
    const department = await db
      .select()
      .from(departments)
      .where(eq(departments.id, departmentIdNumber));

    if (department.length === 0) {
      return fail(400, {
        DepartmentError: "Department tidak ditemukan",
      });
    }

    const categoryIdNumber = Number(categoryId);

    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryIdNumber));

    if (category.length === 0) {
      return fail(400, {
        CategoryError: "Category tidak ditemukan",
      });
    }

    await db
      .update(tickets)
      .set({
        title: String(title),
        description: String(description),
        priority: String(priority),
        departmentId: departmentIdNumber,
        categoryId: categoryIdNumber,
      })
      .where(eq(tickets.id, Number(params.id)));

    throw redirect(303, `/tickets/${params.id}`);
  },
};
