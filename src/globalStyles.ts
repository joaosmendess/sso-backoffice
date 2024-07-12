import { globalCss } from './stitches.config';

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  body: { 
    fontFamily: '$body', 
    backgroundColor: '#004d61', // Azul petróleo sólido
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff', // Cor do texto padrão (branco)
    overflow: 'hidden',
    
  },
  '#root': {
    position: 'relative',
    zIndex: 1,
  },
});

export default globalStyles;
