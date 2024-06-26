// src/globalStyles.ts
import { globalCss } from './stitches.config';

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  body: { fontFamily: '$body' },
});

export default globalStyles;