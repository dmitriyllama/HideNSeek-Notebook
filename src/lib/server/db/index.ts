import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@netlify/neon';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { rulesets } from './schema';
import { eq } from 'drizzle-orm';

if (!env.NETLIFY_DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = neon(env.NETLIFY_DATABASE_URL);

export const db = drizzle(client, { schema });

export async function getRulesets() {
    return db.select({
        page: rulesets.page,
        name: rulesets.name,
        description: rulesets.description,
        place: rulesets.place,
        players: rulesets.players
    }).from(rulesets);
}

export async function getRuleset(link: string) {
    return db.select({
        name: rulesets.name,
        description: rulesets.description,
        place: rulesets.place,
        players: rulesets.players,
        rules: rulesets.rules
    }).from(rulesets).where(eq(rulesets.page, link));
}