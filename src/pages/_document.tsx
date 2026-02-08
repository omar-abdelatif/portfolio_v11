import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased selection:bg-primary selection:text-primary-foreground">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
