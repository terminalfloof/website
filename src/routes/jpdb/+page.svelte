<script lang="ts">
	let { data }: { data: { tokens: any[]; vocabulary: any[]; sentence: string } } = $props();
	const modifiedData: {
		word: string;
		color: string;
		level: string | null;
		state: string[] | null;
		isVocab: boolean;
	}[] = [];
	const tokens = [...data.tokens];
	let stringIndex = 0;
	while (stringIndex < data.sentence.length) {
		// is there another token?
		if (tokens.length == 0) break;
		// does the next token contain the current stringIndex?
		if (stringIndex >= tokens[0][1] && stringIndex <= tokens[0][1] + tokens[0][2]) {
			// if it does, push to modified data, increment index, and pop first token.
			modifiedData.push({
				word: data.vocabulary[tokens[0][0]][0],
				level: data.vocabulary[tokens[0][0]][2],
				state: data.vocabulary[tokens[0][0]][1],
				color:
					'#' +
					Math.floor(Math.random() * 16777215)
						.toString(16)
						.padStart(6, '0'),
				isVocab: true
			});
			stringIndex += tokens[0][2];
			tokens.shift();
		} else {
			// we know that the next token does not include this index, so we set our new index to the next token.
			modifiedData.push({
				word: data.sentence.substring(stringIndex, tokens[0][1]),
				color: '#000',
				level: null,
				state: null,
				isVocab: false
			});
			stringIndex = tokens[0][1];
		}
	}
</script>

{#each modifiedData as value}
	<span
		title={value.state?.includes('learning') || value.state?.includes('known')
			? value.level
			: value.state?.toString()}
		style={`background-color: ${value.state?.includes('new') && value.isVocab ? 'green' : value.state?.includes('learning') || value.state?.includes('known') ? `hsl(200, 100%, ${10 * parseInt(value.level || '0')}%)` : 'inherit'}`}
		>{value.word}</span
	>
{/each}

<style>
	span {
		display: inline-block;
		border-bottom: 2px solid white;
		margin: 2px;
		font-size: 24px;
	}
</style>
