import { redirect } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

import { deleteSession } from "$lib/server/auth/session";

export const POST: RequestHandler = async ({ cookies }) => {
  const sessionId = cookies.get("session");

  if (sessionId) {
    await deleteSession(sessionId);
  }

  cookies.delete("session", {
    path: "/",
  });

  throw redirect(303, "/login");
};
