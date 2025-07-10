import { db } from '$lib/server/db';
import { rulesets } from '$lib/server/db/schema';
import { fail, type Actions } from '@sveltejs/kit';
import { max } from 'drizzle-orm';

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = {
            page: "",
            name: formData.get("name")?.toString() || "",
            description: formData.get("description")?.toString() || "",
            place: formData.get("place")?.toString() || "",
            players: formData.get("teams")?.toString() + " teams of " + formData.get("players")?.toString() + "players",
            rules: formData.get("rules")?.toString() || ""
        };

        const errors: { field: string, message: string }[] = [];

        if (!data.name) errors.push({ field: "name", message: "Name is empty" });
        else if (data.name.length < 5) errors.push({ field: "name", message: "Name is too short" });
        else if (data.name.length > 30) errors.push({ field: "name", message: "Name is too long" });
        else if (!/^[a-zA-Z0-9 ,_-]*$/.test(data.name)) errors.push({ field: "name", message: "Name has unwanted symbols" });

        if (!data.description) errors.push({ field: "description", message: "Description is empty" });
        else if (data.description.length < 16) errors.push({ field: "description", message: "Description is too short" });
        else if (data.description.length > 240) errors.push({ field: "description", message: "Description is too long" });

        if (!data.place) errors.push({ field: "place", message: "Place is empty" });
        else if (data.place.length < 2) errors.push({ field: "place", message: "Place name is too short" });
        else if (data.place.length > 26) errors.push({ field: "place", message: "Place name is too long" });

        if (data.rules.length > 1000) errors.push({ field: "rules", message: "Rules section is too long" });
        else if (data.rules.includes("<script>")) errors.push({ field: "rules", message: "Invalid rules" });
        
        if (errors.length > 0) {
            return fail(400, { 
                errors: errors.map(e => e.message),
                data 
            });
        }

        try {
            const possiblePageId = await db.select({id: max(rulesets.id)}).from(rulesets);
            let pageId: number;
            if (possiblePageId.length == 0) pageId = 0;
            else pageId = possiblePageId[0].id!;
            data.page = (pageId.toString() + formData.get("name")?.toString().toLowerCase().replaceAll(" ", "_")) || "";
            // Insert into Neon database using Drizzle
            await db.insert(rulesets).values({
                page: data.page!,
                name: data.name,
                description: data.description,
                place: data.place,
                players: data.players,
                rules: data.rules
            });
        } catch (error) {
            console.error('Database error:', error);
            return fail(500, { 
                errors: ['Failed to create ruleset. Please try again.'] 
            });
        }
    }
};