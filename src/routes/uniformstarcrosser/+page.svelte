<script lang="ts">
	import Particles from '../Particles.svelte';
</script>

<div class="absolute top-1/2 left-1/2 z-10 w-2/3 -translate-x-1/2 -translate-y-1/2 transform">
	<pre class="mt-2 w-full text-center text-xl">import base64 from "decode-tools"<br
		/>const result = base64.decode(fetch("/cipher"))</pre>
</div>
<Particles />
