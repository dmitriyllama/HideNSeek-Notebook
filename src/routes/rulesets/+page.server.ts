import { getRulesets } from '$lib/server/db';

export const load = async () => {
	return {
		rulesets: await getRulesets()
	};
};
