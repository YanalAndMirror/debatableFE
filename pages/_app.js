import 'tailwindcss/tailwind.css';
import Header from '../components/Header';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
