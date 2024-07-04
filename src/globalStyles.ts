// src/globalStyles.ts
import { globalCss } from './stitches.config';

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  body: { fontFamily: '$body', backgroundColor:'#f0f4f9',overflowY:'hidden' },
});

export default globalStyles;