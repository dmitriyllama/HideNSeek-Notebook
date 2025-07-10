import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const rulesets = pgTable('rulesets', {
	id: serial('id').primaryKey(),
	page: varchar('page', { length: 30 }).notNull(),
	name: varchar('name', { length: 30 }).notNull(),
	description: varchar('description', { length: 240 }).notNull(),
	place: varchar('place', { length: 26 }).notNull(),
	players: varchar('players', { length: 21 }).notNull(),
	rules: text('rules'),
	createdAt: timestamp('created_at').defaultNow()
});
