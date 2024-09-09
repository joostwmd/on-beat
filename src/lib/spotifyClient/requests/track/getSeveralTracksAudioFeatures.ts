import { getAuthHeader } from '../auth/getAuthHeader';

export async function getSeveralTracksAudioFeatures(trackIds: string[]) {
	const header: Headers = await getAuthHeader();
	const response = await fetch(
		`https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`,
		{
			headers: header
		}
	);

	const data: any = await response.json();
	return data.audio_features;
}
