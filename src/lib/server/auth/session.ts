import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import { sessions } from "$lib/server/db/schema";

export async function createSession(userId: number) {
  const sessionId = randomUUID();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  });

  return sessionId;
}

export async function getUserId(sessionId: string) {
  const result = await db
    .select({
      userId: sessions.userId,
      expiresAt: sessions.expiresAt,
    })
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);

  if (result.length === 0) {
    return undefined;
  }

  const session = result[0];

  if (session.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return undefined;
  }

  return session.userId;
}

export async function deleteSession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}
