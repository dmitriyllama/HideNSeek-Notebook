import { deletePage, getRulesetFromPage, updateRules } from '$lib/server/db'
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    return {
        ruleset: await getRulesetFromPage(params.rulepage)
    };
};

export const actions: Actions = {
    del: async ({ request, params }) => {
        await deletePage(params.rulepage!);
    },

    upd: async ({ request, params }) => {
        const formData = await request.formData();
        const data = { rules: formData.get("rules")?.toString() || "" };

        if (data.rules.length > 1000 || data.rules.includes("<script>")) {
            return fail(400);
        }

        try {
            await updateRules(params.rulepage!, data);
        } catch (e) {
            return fail(500);
        }
    }
};