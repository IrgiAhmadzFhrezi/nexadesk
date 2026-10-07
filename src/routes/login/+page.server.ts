import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { createSession } from "$lib/server/auth/session";
import argon2 from "argon2";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return fail(400, {
        error: "Email dan password wajib diisi.",
      });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      return fail(401, {
        error: "Email atau password salah.",
      });
    }

    const isValid = await argon2.verify(user[0].passwordHash, password);
    
    if (!isValid) {
      return fail(401, {
        error: "Email atau password salah.",
      });
    }

    const sessionId = createSession(user[0].id);

    cookies.set("session", sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    throw redirect(303, "/");
  },
};
