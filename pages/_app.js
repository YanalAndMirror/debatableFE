import 'tailwindcss/tailwind.css';
import Apollo from '../providers/apollo.js';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <Apollo>
      <Nav />
      <Component {...pageProps} />
    </Apollo>
  );
}

export default MyApp;
