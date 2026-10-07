import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

import { getUserId } from "$lib/server/auth/session";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("session");

  if (sessionId) {
    const userId = getUserId(sessionId);

    if (userId) {
      const result = await db
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

      if (result.length > 0) {
        event.locals.user = result[0];
      }
    }
  }

  return resolve(event);
};
