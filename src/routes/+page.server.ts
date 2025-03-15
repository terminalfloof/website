import type { PageServerLoad } from './$types';
import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from '$env/static/private';

let token = '';

async function refreshToken() {
	console.log('refreshing token.');
	const result = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: REFRESH_TOKEN || ''
		}).toString()
	});
	const resultJson = await result.json();

	if (result.status === 200) {
		token = resultJson.access_token;
		console.log('token refreshed.');
	} else {
		console.log('token refresh failed.');
	}
}

interface LastPlayed {
	items?: { track: { name: string } }[];
}

let lastPlayed: LastPlayed = {};
let lastSong = '';

async function updateLastPlayed() {
	console.log('updating last played');
	const result = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
		headers: {
			Authorization: 'Bearer ' + token
		}
	});

	if (result.ok) {
		const resultJson = await result.json();
		lastPlayed = resultJson;
		if (lastPlayed.items !== undefined && lastPlayed.items[0].track.name !== lastSong) {
			lastSong = lastPlayed.items[0].track.name;
			console.log('found new song: ' + lastSong);
		}
	} else if (result.status === 401) {
		console.log('token expired.');
		await refreshToken();
		updateLastPlayed();
	} else {
		console.log('error fetching last played.');
		console.log(result);
	}
}

setInterval(updateLastPlayed, 1000 * 30);
updateLastPlayed();

// app.get('/forceUpdate', async function (req, res) {
// 	await updateLastPlayed();
// 	res.send('done');
// });

export const load: PageServerLoad = async () => {
	if (lastPlayed.items === undefined) {
		await refreshToken();
		await updateLastPlayed();
	}
	if (lastPlayed.items === undefined) {
		return {};
	}
	return lastPlayed.items[0];
};
