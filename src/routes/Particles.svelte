<script lang="ts">
	import Particles, { particlesInit } from '@tsparticles/svelte';
	//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
	import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

	let particlesUrl = 'http://foo.bar/particles.json'; // placeholder, replace it with a real url

	let particlesConfig = {
		particles: {
			color: {
				value: '#777'
			},
			links: {
				enable: true,
				color: '#444'
			},
			move: {
				enable: true,
				speed: {
					min: 1,
					max: 3
				}
			},
			number: {
				value: 75
			}
		}
	};

	let onParticlesLoaded = (event: CustomEvent) => {
		const particlesContainer = event.detail.particles;
		console.log('loaded');
		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	void particlesInit(async (engine) => {
		// call this once per app
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(engine);
		await loadSlim(engine);
	});
</script>

<Particles
	id="tsparticles"
	options={particlesConfig}
	style="z-index: -1; opacity: 0.5;"
	on:particlesLoaded={onParticlesLoaded}
/>
