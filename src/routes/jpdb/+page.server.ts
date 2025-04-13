import type { PageServerLoad } from '../$types';
import { JPDB_KEY } from '$env/static/private';

async function parseSentence(sentence: string) {
	const fetchBody = {
		text: sentence,
		token_fields: ['vocabulary_index', 'position', 'length'],
		position_length_encoding: 'utf16',
		vocabulary_fields: ['spelling', 'card_state', 'card_level']
	};
	const parsed = await fetch('https://jpdb.io/api/v1/parse', {
		method: 'POST',
		body: JSON.stringify(fetchBody),
		headers: {
			Authorization: 'Bearer ' + JPDB_KEY
		}
	});
	const json = await parsed.json();
	return json;
}

const sentenceMap = new Map();

export const load: PageServerLoad = async ({ url }) => {
	const sentence = url.searchParams.get('sentence') || '';
	if (!sentence) return {};
	if (sentenceMap.has(sentence)) {
		console.log(`Sentence ${sentence.substring(0, 15)}... found in cache`);
		const cached = sentenceMap.get(sentence);
		return {
			tokens: cached.tokens,
			vocabulary: cached.vocabulary,
			sentence: sentence
		};
	}
	const tokens = await parseSentence(sentence);
	console.log(`New sentence ${sentence.substring(0, 15)}... found, fetched and stored in cache.`);
	sentenceMap.set(sentence, tokens);
	return {
		tokens: tokens.tokens,
		vocabulary: tokens.vocabulary,
		sentence: sentence
	};
};
