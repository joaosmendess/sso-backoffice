import { globalCss } from './stitches.config';
import background from './assets/richard-horvath-cPccYbPrF-A-unsplash.jpg';

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  body: { 
    fontFamily: '$body', 
    background: `url(${background}) no-repeat center center`,
    backgroundSize: 'cover',
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
   
  }
});

export default globalStyles;
