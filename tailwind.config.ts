import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif']
      },
      keyframes: {
        slideDown: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' }
        }
      },
      animation: {
        slideDown: 'slideDown 0.35s ease-out'
      },
      width: {
        toggle: '6.41rem'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        red: {
          400: '#ef4444',
          500: '#c22229',
          600: '#991b1b'
        }
      },
      boxShadow: {
        'custom-dark': '0 4px 6px rgba(0, 0, 0, 0.5)'
      }
    }
  },
  plugins: []
};
export default config;
