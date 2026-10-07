import { db } from "$lib/server/db";
import { tickets } from "$lib/server/db/schema";
import { count, eq, desc } from "drizzle-orm";

export async function load() {
  const openTickets = await db
    .select({
      count: count(),
    })
    .from(tickets)
    .where(eq(tickets.status, "OPEN"));

  const assignedTickets = await db
    .select({
      count: count(),
    })
    .from(tickets)
    .where(eq(tickets.status, "ASSIGNED"));

  const inProgressTickets = await db
    .select({
      count: count(),
    })
    .from(tickets)
    .where(eq(tickets.status, "IN_PROGRESS"));

  const waitingUserTickets = await db
    .select({
      count: count(),
    })
    .from(tickets)
    .where(eq(tickets.status, "WAITING_USER"));

  const resolvedTickets = await db
    .select({
      count: count(),
    })
    .from(tickets)
    .where(eq(tickets.status, "RESOLVED"));

  const closedTickets = await db
    .select({
      count: count(),
    })
    .from(tickets)
    .where(eq(tickets.status, "CLOSED"));

  const recentTickets = await db
    .select({
      id: tickets.id,
      title: tickets.title,
      status: tickets.status,
      priority: tickets.priority,
      createdAt: tickets.createdAt,
    })
    .from(tickets)
    .orderBy(desc(tickets.id))
    .limit(5);
    
  return {
    ticketStats: {
      open: openTickets[0].count,
      assigned: assignedTickets[0].count,
      inProgress: inProgressTickets[0].count,
      waitingUser: waitingUserTickets[0].count,
      resolved: resolvedTickets[0].count,
      closed: closedTickets[0].count,
    },
    recentTickets,
  };
}
