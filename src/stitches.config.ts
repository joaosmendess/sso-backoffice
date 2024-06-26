import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme } = createStitches({
  theme: {
    colors: {
      primary: '#FFFFFF',
      secondary: '#1a1a1a',
    },
    fonts: {
      body: 'system-ui, sans-serif',
      heading: 'Georgia, serif',
    },
  },
});