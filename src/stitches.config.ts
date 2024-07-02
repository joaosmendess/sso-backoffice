import { createStitches } from '@stitches/react';

export const { getCssText, styled, globalCss } = createStitches({
  theme: {
    colors: {
      primary: '#f0f4f9',
      secondary: '#1a1a1a',
    },
    fonts: {
      body: 'system-ui, sans-serif',
      heading: 'Georgia, serif',
    },
  },
});