import { fail, type Actions } from '@sveltejs/kit';


export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = {
            name: formData.get("name")?.toString() || "",
            description: formData.get("description")?.toString() || "",
            place: formData.get("place")?.toString() || "",
            teams: Number(formData.get("teams")),
            players: Number(formData.get("players")),
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

        if (data.teams < 2) errors.push({ field: "teams", message: "Teams cannot be fewer than 2" });
        else if (data.teams > 6) errors.push({ field: "teams", message: "Teams cannot be more than 6" });

        if (data.players < 1) errors.push({ field: "players", message: "Players cannot be fewer than 1" });
        else if (data.players > 6) errors.push({ field: "players", message: "Players cannot be more than 6" });

        if (data.rules.length > 1000) errors.push({ field: "rules", message: "Rules section is too long" });
        else if (data.rules.includes("<script>")) errors.push({ field: "rules", message: "Invalid rules" });
        
        if (errors.length > 0) {
            return fail(400, { 
                errors: errors.map(e => e.message),
                data 
            });
        }

        // TODO db shenans
    }
};