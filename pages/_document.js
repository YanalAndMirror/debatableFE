import Document, { Head, Html, Main, NextScript } from 'next/document';
import Cookies from 'js-cookie';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    let theme;
    if (typeof window !== 'undefined') {
      theme = window.localStorage.getItem('theme');
    }
    console.log(theme);
    return (
      <Html data-theme={theme ? theme : 'light'}>
        <Head />
        <body className="bg-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
