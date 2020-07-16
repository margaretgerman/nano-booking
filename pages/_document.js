import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GOOGLE_PLACES_API_KEY } from '../utils/config';
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`}
        ></script>
      </Html>
    );
  }
}

export default MyDocument;
