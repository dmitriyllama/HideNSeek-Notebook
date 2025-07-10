import { deletePage, getRulesetFromPage } from '$lib/server/db'
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    return {
        ruleset: await getRulesetFromPage(params.rulepage)
    };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        await deletePage(params.rulepage!);
    }
};