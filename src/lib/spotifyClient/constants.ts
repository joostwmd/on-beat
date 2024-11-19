import { dev } from '$app/environment';
import type { TSpotifyItemCard, TSpotifyItems } from './types';

export const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
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

export const COVER_BASE_64 =
	'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AAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAKCDoAFBB0ACgg6ABQQNABoICgA0ABQQeAAoIOAAUEHQAK/AcTCWR3g97NAgAAAABJRU5ErkJggg==';
