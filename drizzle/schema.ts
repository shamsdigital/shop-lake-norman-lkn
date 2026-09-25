import { pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["user", "admin"]);

const timestamps = {
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
};

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRole("role").default("user").notNull(),
  ...timestamps,
  lastSignedIn: timestamp("lastSignedIn", { mode: "date", withTimezone: true }).defaultNow().notNull(),
});

export const businessCards = pgTable("business_cards", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 255 }).notNull(),
  businessName: varchar("businessName", { length: 255 }).notNull(),
  businessUrl: text("businessUrl"),
  imageUrl: text("imageUrl").notNull(),
  imageKey: text("imageKey"),
  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type BusinessCard = typeof businessCards.$inferSelect;
export type InsertBusinessCard = typeof businessCards.$inferInsert;
