import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import {
  departments,
  categories,
  tickets,
  ticketActivities,
} from "$lib/server/db/schema";

export const load: PageServerLoad = async () => {
  const departmentsData = await db.select().from(departments);

  const categoriesData = await db.select().from(categories);

  return {
    departments: departmentsData,
    categories: categoriesData,
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const priority = formData.get("priority");
    const departmentId = formData.get("department");
    const categoryId = formData.get("category");

    const newTicket = await db
      .insert(tickets)
      .values({
        title: String(title),
        description: String(description),
        priority: String(priority),
        requesterId: 4,
        departmentId: Number(departmentId),
        categoryId: Number(categoryId),
      })
      .returning({
        id: tickets.id,
      });

    await db.insert(ticketActivities).values({
      ticketId: newTicket[0].id,
      userId: 4,
      action: "Created this ticket",
    });

    throw redirect(303, "/tickets");
  },
};
