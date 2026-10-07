import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 30 }).notNull().default("EMPLOYEE"),
  departmentId: integer("department_id")
    .notNull()
    .references(() => departments.id),
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  title: varchar("title", { length: 200 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
  solution: varchar("solution", { length: 2000 }),
  status: varchar("status", { length: 30 }).notNull().default("OPEN"),
  priority: varchar("priority", { length: 20 }).notNull().default("MEDIUM"),

  requesterId: integer("requester_id")
    .notNull()
    .references(() => users.id),

  assignedTo: integer("assigned_to").references(() => users.id),

  departmentId: integer("department_id")
    .notNull()
    .references(() => departments.id),

  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
});

export const ticketComments = pgTable("ticket_comments", {
  id: serial("id").primaryKey(),

  ticketId: integer("ticket_id")
    .notNull()
    .references(() => tickets.id),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  comment: varchar("comment", { length: 1000 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const ticketActivities = pgTable("ticket_activities", {
  id: serial("id").primaryKey(),

  ticketId: integer("ticket_id")
    .notNull()
    .references(() => tickets.id),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  action: varchar("action", { length: 100 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
