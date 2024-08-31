import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { myCustomTheme } from './src/theme';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			screens: {
				sm: { max: '480px' }, // mobile
				md: { min: '481px', max: '1023px' }, // tablet
				lg: { min: '1024px' } // desktop
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [myCustomTheme]
			}
		})
	]
} satisfies Config;
