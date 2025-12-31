import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
    theme: {
          extend: {
                  colors: {
                            'bg-amber-600': '#d97706',
                            'bg-green-600': '#16a34a',
                            'bg-blue-600': '#2563eb',
                            'bg-purple-600': '#9333ea',
                            'bg-rose-600': '#e11d48',
                            'bg-cyan-600': '#0891b2',
                            'bg-orange-600': '#ea580c',
                            'bg-indigo-600': '#4f46e5',
                  },
          },
    },
    plugins: [],
};

export default config;
