import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head className="bg-base-100" />
        <body className="bg-base-100 h-full">
          <Main className="bg-base-100" />
          <NextScript className="bg-base-100" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
