import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@netlify/neon';
import * as schema from './schema';
import { NETLIFY_DATABASE_URL } from '$env/static/private';
import { rulesets } from './schema';
import { eq, max } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

if (!NETLIFY_DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = neon(NETLIFY_DATABASE_URL);

export const db = drizzle(client, { schema });

export async function getNextPageId() {
    const possiblePageIds = await db.select({id: max(rulesets.id)}).from(rulesets);
    let pageId: number;
    if (possiblePageIds[0].id === null) return 0;
    return possiblePageIds[0].id!
}

export async function getRulesets() {
    try {    
        return await db.select({
            page: rulesets.page,
            name: rulesets.name,
            description: rulesets.description,
            place: rulesets.place,
            players: rulesets.players
        }).from(rulesets);
    } catch (e) {
        console.error(e);
        error(500, { message: "Server error" });
    }
}

export async function getRulesetFromPage(link: string) {
    try {
        let ruleset = await db.select({
            name: rulesets.name,
            description: rulesets.description,
            place: rulesets.place,
            players: rulesets.players,
            rules: rulesets.rules
        }).from(rulesets).where(eq(rulesets.page, link));
        if (ruleset.length !== 0) return ruleset[0];
    } catch (e) {
        console.error(e);
        error(500, { message: "Server error" });
    }
    error(404, { message: "Not Found" });
}

export async function deletePage(link: string) {
    try {
        await db.delete(rulesets).where(eq(rulesets.page, link));
    } catch (e) {
        console.error(e);
        error(500, { message: "Server error" });
    }
}

export async function updateRules(link: string, rules: { rules: string }) {
    await db.update(rulesets).set(rules).where(eq(rulesets.page, link));
}