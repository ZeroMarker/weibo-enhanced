import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        weibo: {
          red: '#ff8200',
          orange: '#ff6600',
          yellow: '#ffcc00',
        },
      },
    },
  },
  plugins: [],
}
export default config
