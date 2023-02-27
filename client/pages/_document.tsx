import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    /> */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="icon" type="image/jpg" sizes="32x32" href="/favicon-32x32.jpg" />
                    <link rel="icon" type="image/jpg" sizes="16x16" href="/favicon-16x16.jpg" />
                    <meta name="color-scheme" content="only light" />
                    <meta name="description" content="Italian restaurant" />
                    <meta property="og:title" content="Italian restaurant" />
                    <meta property="og:description" content="Italian restaurant" />
                    <meta property="og:type" content="website" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
