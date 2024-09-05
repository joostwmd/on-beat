declare namespace SpotifyApi {
	interface AuthorizationResponse {
		access_token: string;
		expires_in: number;
		refresh_token: string;
		scope: string;
		token_type: string;
	}

	interface UserResponse {
		country: string;
		display_name: string;
		email: string;
		explicit_content: {
			filter_enabled: boolean;
			filter_locked: boolean;
		};
		external_urls: {
			spotify: string;
		};
		followers: {
			href: string | null;
			total: number;
		};
		href: string;
		id: string;
		images: {
			height: number;
			url: string;
			width: number;
		}[];
		product: string;
		type: string;
		uri: string;
	}

	interface Playlist {
		collaborative: boolean;
		description: string;
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		images: [
			{
				url: string;
				height: number;
				width: number;
			}
		];
		name: string;
		owner: {
			display_name: string;
			external_urls: {
				spotify: string;
			};
			href: string;
			id: string;
			type: string;
			uri: string;
		};
		public: boolean;
		snapshot_id: string;
		tracks: {
			href: string;
			total: number;
		};
		type: 'playlist';
		uri: string;
	}

	interface UserPlaylistsResponse {
		href: string;
		items: [Playlist];
		limit: number;
		next: string;
		offset: number;
		previous: string;
		total: number;
	}
}

export type TSpotifyItems = 'track' | 'artist' | 'album' | 'playlist';

export type TSpotifyItemCard = {
	type: string;
	id: string;
	title: string;
	subtitle?: string;
	imageUrl: string;
};

export type TGenre = {
	type: 'genre';
	value: string;
};

export type TSeed = TSpotifyItemCard | TGenre;

export type TChannelVariants = 'energy' | 'danceability' | 'liveness' | 'popularity';

export type TBpm = {
	min: number;
	max: number;
};

export type TChannels = {
	[key in TChannelTypes]: { value: number; active: boolean };
};

export type TKeySetting = {
	value: number;
	active: boolean;
};

export type TBpmOrderVariants = 'bpm-ascending' | 'bpm-descending' | null;

export type TBpmOrderSetting = {
	value: TBpmOrderVariants;
	active: boolean;
};

export type TLedStatus = 'success' | 'warning' | 'error';
