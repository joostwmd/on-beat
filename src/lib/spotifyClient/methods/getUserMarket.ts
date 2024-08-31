import { getUser } from '../requests/user/getUser';

export async function getUserData(): Promise<{ market: string; userId: string }> {
	const data = await getUser();
	return {
		market: data.country,
		userId: data.id
	};
}
