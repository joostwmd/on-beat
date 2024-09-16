import { dev } from '$app/environment';
import type { TSpotifyItemCard, TSpotifyItems } from './types';

export const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
export const SPOTIFY_CLIENT_ID = 'e1a3ef101a284150a3716648e6466530';
export const SPOTIFY_REDIRECT_URI = dev
	? 'http://localhost:5173/auth/callback'
	: 'https://onbeat.joostsworld.dev/auth/callback';

export const SPOTIFY_SCOPES = [
	'ugc-image-upload',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'app-remote-control',
	'streaming',
	'playlist-read-private',
	'playlist-read-collaborative',
	'playlist-modify-private',
	'playlist-modify-public',
	'user-follow-modify',
	'user-follow-read',
	'user-read-playback-position',
	'user-top-read',
	'user-read-recently-played',
	'user-library-modify',
	'user-library-read',
	'user-read-email',
	'user-read-private'
];

export const SPOTIFY_ERROR_MESSAGES = {
	invalidToken: 'Invalid access token',
	expiredToken: 'The access token expired'
};

export const SPOTIFY_FILTERS = {
	search: ['seed_artists', 'seed_tracks'],
	number: [
		'limit',
		'min_acousticness',
		'max_acousticness',
		'target_acousticness',
		'min_danceability',
		'max_danceability',
		'target_danceability',
		'min_duration_ms',
		'max_duration_ms',
		'target_duration_ms',
		'min_energy',
		'max_energy',
		'target_energy',
		'min_instrumentalness',
		'max_instrumentalness',
		'target_instrumentalness',
		'min_key',
		'max_key',
		'target_key',
		'min_liveness',
		'max_liveness',
		'target_liveness',
		'min_loudness',
		'max_loudness',
		'target_loudness',
		'min_mode',
		'max_mode',
		'target_mode',
		'min_popularity',
		'max_popularity',
		'target_popularity',
		'min_speechiness',
		'max_speechiness',
		'target_speechiness',
		'min_tempo',
		'max_tempo',
		'target_tempo',
		'min_time_signature',
		'max_time_signature',
		'target_time_signature',
		'min_valence',
		'max_valence',
		'target_valence'
	]
};

export const SPOTIFY_RELEVANT_FILTERS = [
	'min_tempo',
	'max_tempo',
	'target_tempo',
	'target_key',
	'seed_artists',
	'seed_genres',
	'seed_tracks'
];

export const SPOTIFY_AVAILABLE_GENRE_SEEDS = [
	'acoustic',
	'afrobeat',
	'alt-rock',
	'alternative',
	'ambient',
	'anime',
	'black-metal',
	'bluegrass',
	'blues',
	'bossanova',
	'brazil',
	'breakbeat',
	'british',
	'cantopop',
	'chicago-house',
	'children',
	'chill',
	'classical',
	'club',
	'comedy',
	'country',
	'dance',
	'dancehall',
	'death-metal',
	'deep-house',
	'detroit-techno',
	'disco',
	'disney',
	'drum-and-bass',
	'dub',
	'dubstep',
	'edm',
	'electro',
	'electronic',
	'emo',
	'folk',
	'forro',
	'french',
	'funk',
	'garage',
	'german',
	'gospel',
	'goth',
	'grindcore',
	'groove',
	'grunge',
	'guitar',
	'happy',
	'hard-rock',
	'hardcore',
	'hardstyle',
	'heavy-metal',
	'hip-hop',
	'holidays',
	'honky-tonk',
	'house',
	'idm',
	'indian',
	'indie',
	'indie-pop',
	'industrial',
	'iranian',
	'j-dance',
	'j-idol',
	'j-pop',
	'j-rock',
	'jazz',
	'k-pop',
	'kids',
	'latin',
	'latino',
	'malay',
	'mandopop',
	'metal',
	'metal-misc',
	'metalcore',
	'minimal-techno',
	'movies',
	'mpb',
	'new-age',
	'new-release',
	'opera',
	'pagode',
	'party',
	'philippines-opm',
	'piano',
	'pop',
	'pop-film',
	'post-dubstep',
	'power-pop',
	'progressive-house',
	'psych-rock',
	'punk',
	'punk-rock',
	'r-n-b',
	'rainy-day',
	'reggae',
	'reggaeton',
	'road-trip',
	'rock',
	'rock-n-roll',
	'rockabilly',
	'romance',
	'sad',
	'salsa',
	'samba',
	'sertanejo',
	'show-tunes',
	'singer-songwriter',
	'ska',
	'sleep',
	'songwriter',
	'soul',
	'soundtracks',
	'spanish',
	'study',
	'summer',
	'swedish',
	'synth-pop',
	'tango',
	'techno',
	'trance',
	'trip-hop',
	'turkish',
	'work-out',
	'world-music'
];

export const SPOTIFY_KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

import placeholderImage from '$lib/icons/spotify.svg';

export function transformSearchResultData(
	data: any,
	type: TSpotifyItems
): TSpotifyItemCard | undefined {
	const placeholderImageUrl = placeholderImage; // Placeholder image URL
	let imageUrl = placeholderImageUrl; // Default to placeholder image

	// Check if images array exists and has at least one image
	if (data.images && data.images.length > 0 && data.images[0].url) {
		imageUrl = data.images[0].url;
	}

	if (type === 'track') {
		return {
			type: 'track',
			id: data.id,
			uri: data.uri,
			title: data.name,
			album: data.album.name,
			albumType: data.album.album_type,
			popularity: data.popularity,
			releaseDate: data.album.release_date,
			subtitle: data.artists.map((artist: any) => artist.name).join(', '),
			previewUrl: data.preview_url,
			imageUrl:
				data.album.images && data.album.images.length > 0
					? data.album.images[0].url
					: placeholderImageUrl
		};
	} else if (type === 'artist') {
		return {
			type: type,
			id: data.id,
			uri: data.uri,
			title: data.name,
			imageUrl: imageUrl,
			genres: data.genres,
			followers: data.followers.total,
			popularity: data.popularity
		};
	} else if (type === 'album' || type === 'playlist') {
		return {
			type: type,
			id: data.id,
			uri: data.uri,
			title: data.name,
			imageUrl: imageUrl
		};
	} else {
		return undefined;
	}
}

export function transformSpotifySeedData(seeds: any[]) {
	const seedArtists = seeds.filter((seed) => seed.type === 'artist').map((seed) => seed.id);
	const seedTracks = seeds.filter((seed) => seed.type === 'track').map((seed) => seed.id);
	const seedGenres = seeds.filter((seed) => seed.type === 'genre').map((seed) => seed.value);

	return {
		seed_artists: seedArtists.join(','),
		seed_tracks: seedTracks.join(','),
		seed_genres: seedGenres.join(',')
	};
}

export const MIN_BPM = 80;
export const MAX_BPM = 200;
