import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '12px',
		'--theme-rounded-container': '0px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #4F46E5
		'--color-primary-50': '229 227 251', // #e5e3fb
		'--color-primary-100': '220 218 250', // #dcdafa
		'--color-primary-200': '211 209 249', // #d3d1f9
		'--color-primary-300': '185 181 245', // #b9b5f5
		'--color-primary-400': '132 126 237', // #847eed
		'--color-primary-500': '79 70 229', // #4F46E5
		'--color-primary-600': '71 63 206', // #473fce
		'--color-primary-700': '59 53 172', // #3b35ac
		'--color-primary-800': '47 42 137', // #2f2a89
		'--color-primary-900': '39 34 112', // #272270
		// secondary | #DAD2BC
		'--color-secondary-50': '249 248 245', // #f9f8f5
		'--color-secondary-100': '248 246 242', // #f8f6f2
		'--color-secondary-200': '246 244 238', // #f6f4ee
		'--color-secondary-300': '240 237 228', // #f0ede4
		'--color-secondary-400': '229 224 208', // #e5e0d0
		'--color-secondary-500': '218 210 188', // #DAD2BC
		'--color-secondary-600': '196 189 169', // #c4bda9
		'--color-secondary-700': '164 158 141', // #a49e8d
		'--color-secondary-800': '131 126 113', // #837e71
		'--color-secondary-900': '107 103 92', // #6b675c
		// tertiary | #0EA5E9
		'--color-tertiary-50': '219 242 252', // #dbf2fc
		'--color-tertiary-100': '207 237 251', // #cfedfb
		'--color-tertiary-200': '195 233 250', // #c3e9fa
		'--color-tertiary-300': '159 219 246', // #9fdbf6
		'--color-tertiary-400': '86 192 240', // #56c0f0
		'--color-tertiary-500': '14 165 233', // #0EA5E9
		'--color-tertiary-600': '13 149 210', // #0d95d2
		'--color-tertiary-700': '11 124 175', // #0b7caf
		'--color-tertiary-800': '8 99 140', // #08638c
		'--color-tertiary-900': '7 81 114', // #075172
		// success | #2ad309
		'--color-success-50': '223 248 218', // #dff8da
		'--color-success-100': '212 246 206', // #d4f6ce
		'--color-success-200': '202 244 194', // #caf4c2
		'--color-success-300': '170 237 157', // #aaed9d
		'--color-success-400': '106 224 83', // #6ae053
		'--color-success-500': '42 211 9', // #2ad309
		'--color-success-600': '38 190 8', // #26be08
		'--color-success-700': '32 158 7', // #209e07
		'--color-success-800': '25 127 5', // #197f05
		'--color-success-900': '21 103 4', // #156704
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #f90101
		'--color-error-50': '254 217 217', // #fed9d9
		'--color-error-100': '254 204 204', // #fecccc
		'--color-error-200': '254 192 192', // #fec0c0
		'--color-error-300': '253 153 153', // #fd9999
		'--color-error-400': '251 77 77', // #fb4d4d
		'--color-error-500': '249 1 1', // #f90101
		'--color-error-600': '224 1 1', // #e00101
		'--color-error-700': '187 1 1', // #bb0101
		'--color-error-800': '149 1 1', // #950101
		'--color-error-900': '122 0 0', // #7a0000
		// surface | #757575
		'--color-surface-50': '234 234 234', // #eaeaea
		'--color-surface-100': '227 227 227', // #e3e3e3
		'--color-surface-200': '221 221 221', // #dddddd
		'--color-surface-300': '200 200 200', // #c8c8c8
		'--color-surface-400': '158 158 158', // #9e9e9e
		'--color-surface-500': '117 117 117', // #757575
		'--color-surface-600': '105 105 105', // #696969
		'--color-surface-700': '88 88 88', // #585858
		'--color-surface-800': '70 70 70', // #464646
		'--color-surface-900': '57 57 57' // #393939
	}
};
