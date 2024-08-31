export async function getAuthHeader() {
	const accessToken = localStorage.getItem('access_token');
	return new Headers({
		Authorization: `Bearer ${accessToken}`,
		'Content-Type': 'application/json'
	});
}
