import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <title>Coventi - Inspiring Creativity</title> */}

        <meta
          name="keywords"
          content="event, afrobeat, event streaming, stream, livestream, streamer, concert, music, live, festival, experience, video streaming, live streaming, songs, live performance, afrobeats, african music, music performance, african Artists, live theatre, stage play, production"
        />
        <meta key="author" content="Coventi" />
        <meta
          property="og:type"
          key="type"
          content="event, afrobeat, event streaming"
        />
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        /> */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="pwa-demo" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="manifest"
          crossOrigin="use-credentials"
          href="./manifest.json"
        />

        {/* <meta key="title" content="Coventi - Inspiring Creativity" />
				<meta key="description" content="" />

				<meta property="og:url" key='url' content="https://coventi.co" />
				<meta property="og:title" key="title" content="Coventi - Inspiring Creativity" />
				<meta property="og:site_name" key='site_name' content="Coventi" />
				<meta property="og:description" key="description" content="" />

				<meta property="twitter:url" content="https://coventi.co" />
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:title" content="Coventi - Inspiring Creativity" />
				<meta property="twitter:image" content="assets/images/coventi_flyer.png" />
				<meta property="twitter:description" content="" /> */}

        <link rel="canonical" href="https://coventi.co" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js"
          integrity="sha512-lOtDAY9KMT1WH9Fx6JSuZLHxjC8wmIBxsNFL6gJPaG7sLIVoSO9yCraWOwqLLX+txsOw0h2cHvcUJlJPvMlotw=="
          crossOrigin="anonymous"
        ></script>
      </body>
    </Html>
  );
}
