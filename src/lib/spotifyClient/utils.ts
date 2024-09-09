import { type ModalSettings, type ModalStore } from '@skeletonlabs/skeleton';
import { getTrackAudioFeatures } from './requests/track/getTrackAudioFeatures';

type TSpotifyItemVariants = 'track' | 'album' | 'artist' | 'playlist' | 'show' | 'episode';

export async function handleInfoClick(
	type: TSpotifyItemVariants,
	data: any,
	modalStore: ModalStore
) {
	if (type === 'track') {
		const track = data;
		const audioFeatures = await getTrackAudioFeatures(track.id);

		const modal: ModalSettings = {
			type: 'component',
			component: 'trackModal',
			meta: {
				img: track.imageUrl,
				title: track.title,
				artist: track.subtitle,
				album: track.album,
				albumType: track.albumType,
				releaseDate: track.releaseDate,
				duration: `${Math.floor(audioFeatures.duration_ms / 60000)}:${Math.floor((audioFeatures.duration_ms % 60000) / 1000)}`,
				popularity: track.popularity,
				tempo: audioFeatures.tempo,
				liveness: audioFeatures.liveness,
				danceability: audioFeatures.danceability,
				energy: audioFeatures.energy
			}
		};

		modalStore.trigger(modal);
	} else if (type === 'artist') {
		const artist = data;

		const modal: ModalSettings = {
			type: 'component',
			component: 'artistModal',
			meta: {
				title: artist.title,
				img: artist.imageUrl,
				genres: artist.genres,
				followers: artist.followers,
				popularity: artist.popularity
			}
		};

		modalStore.trigger(modal);
	}
}
