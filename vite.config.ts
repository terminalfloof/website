import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		https: {
			key: fs.readFileSync('/etc/ssl/certs/floof.key'),
			cert: fs.readFileSync('/etc/ssl/certs/terminalfloof_me.crt')
		}
	}
});
