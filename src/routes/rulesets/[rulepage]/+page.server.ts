import { getRulesetFromPage } from '$lib/server/db'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    return {
        ruleset: await getRulesetFromPage(params.rulepage)
    };
};