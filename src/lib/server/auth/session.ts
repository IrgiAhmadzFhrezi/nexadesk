import { randomUUID } from "crypto";

const sessions = new Map<string, number>();

export function createSession(userId: number) {
  const sessionId = randomUUID();

  sessions.set(sessionId, userId);

  return sessionId;
}

export function getUserId(sessionId: string) {
  return sessions.get(sessionId);
}
