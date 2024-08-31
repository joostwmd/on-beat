import { getAuthHeader } from '../auth/getAuthHeader';

export async function getUser(): Promise<SpotifyApi.UserResponse> {
	try {
		const header: Headers = await getAuthHeader();
		const response = await fetch('https://api.spotify.com/v1/me', { headers: header });
		const data: any = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Failed to get user: ${error}`);
	}
}
