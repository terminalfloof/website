<script lang="ts">
	import Particles from '../Particles.svelte';
	import LEFT from '$lib/assets/LEFT2.png';
	import CENTER from '$lib/assets/CENTER2.png';
	import RIGHT from '$lib/assets/RIGHT2.png';
</script>

<div class="absolute top-1/2 left-1/2 z-10 w-2/3 -translate-x-1/2 -translate-y-1/2 transform">
	<div class="flex gap-2">
		<img class="w-1/3" src={LEFT} alt="LEFT" />
		<img class="w-1/3" src={CENTER} alt="CENTER" />
		<img class="w-1/3" src={RIGHT} alt="RIGHT" />
	</div>
	<pre class="mt-2 w-full text-center text-xl">window.url.replace("011", result.toLowerCase())</pre>
</div>
<Particles />
