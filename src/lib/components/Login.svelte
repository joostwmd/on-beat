<script>
	import {
		SPOTIFY_CLIENT_ID,
		SPOTIFY_REDIRECT_URI,
		SPOTIFY_SCOPES
	} from '$lib/spotifyClient/constants';
	import turntable from '$lib/icons/turntable.svg';
	import TextCard from './monecules/cards/TextCard.svelte';

	let clientId = SPOTIFY_CLIENT_ID;
	let redirectUri = SPOTIFY_REDIRECT_URI;
	let scope = SPOTIFY_SCOPES.join(' ');
	let url = 'https://accounts.spotify.com/api/token';
	let authUrl = 'https://accounts.spotify.com/authorize';

	const generateRandomString = (length) => {
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let text = '';
		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	};

	const sha256 = async (plain) => {
		const encoder = new TextEncoder();
		const data = encoder.encode(plain);
		const hash = await crypto.subtle.digest('SHA-256', data);
		return hash;
	};

	const base64UrlEncode = (arrayBuffer) => {
		let str = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
		return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	};

	const handleRedirect = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		let code = urlParams.get('code');
		if (code) {
			let codeVerifier = localStorage.getItem('code_verifier');
			const payload = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					client_id: clientId,
					grant_type: 'authorization_code',
					code,
					redirect_uri: redirectUri,
					code_verifier: codeVerifier
				})
			};
			const response = await fetch(url, payload);
			const data = await response.json();
			console.log(data);
			localStorage.setItem('access_token', data.access_token);
		}
	};

	const login = async () => {
		let codeVerifier = generateRandomString(64);
		localStorage.setItem('code_verifier', codeVerifier);
		let hashed = await sha256(codeVerifier);
		let codeChallenge = base64UrlEncode(hashed);
		let params = new URLSearchParams({
			client_id: clientId,
			response_type: 'code',
			redirect_uri: redirectUri,
			code_challenge_method: 'S256',
			code_challenge: codeChallenge,
			scope: scope
		});
		window.location.href = `${authUrl}?${params.toString()}`;
	};
</script>

<div class="">
	<div class="w-88">
		<TextCard text="login in with spotify" onClick={login} isSelected={true} />
	</div>

	<div id="turntables-wrap">
		<div class="">
			<img id="turntable-first" src={turntable} alt="turntable" />
		</div>

		<div class="">
			<img id="turntable-second" src={turntable} alt="turntable" />
		</div>
	</div>
</div>

<style>
	#turntables-wrap {
		position: absolute;
		top: 0;
		left: 50%;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	#turntable-first {
		animation: spin-clockwise 10s linear infinite;
		width: 400px;
		height: 400px;
	}

	#turntable-second {
		animation: spin-anticlockwise 10s linear infinite;
		width: 400px;
		height: 400px;
	}

	@keyframes spin-clockwise {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes spin-anticlockwise {
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
