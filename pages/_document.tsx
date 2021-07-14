import Document, { Head, Html, Main, NextScript } from 'next/document';
import { OrganisationSchema, WebSiteSchema } from '../components/Seo/SeoSchema';

import React from 'react';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../theme/theme';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <link rel="icon" href="/favicon_32x32.ico" />
          <link rel="apple-touch-icon" href="/favicon_32x32.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon_32x32.ico" />
          <OttplayLink />
          <WebSiteSchema />
          <OrganisationSchema />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta itemProp="name" />
          <meta itemProp="url" content="https://www.ottplay.com/" />
          <meta itemProp="name" content="movies" />
          <meta itemProp="url" content="https://www.ottplay.com/movies" />
          <meta itemProp="name" content="shows" />
          <meta itemProp="url" content="https://www.ottplay.com/shows" />
          <meta itemProp="name" content="netflix" />
          <meta itemProp="url" content="https://www.ottplay.com/netflix" />
          <meta
            name="facebook-domain-verification"
            content="iplwy5mtr7bsnucgtfvduxhjuy1zy5"
          />
          {process.env.REACT_APP_ENV !== 'production' ? (
            <meta name="robots" content="noindex,nofollow" />
          ) : null}
          {process.env.REACT_APP_ENV !== 'production' ? (
            <meta name="googlebot" content="noindex,nofollow" />
          ) : null}
        </Head>
        <body>
          <Main />
          <NextScript />
          <ThirdPartyScripts />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

const OttplayLink = () => {
  return (
    <>
      <link rel="preconnect" href="https://images.ottplay.com" />
      <link rel="preconnect" href="https://api.ottplay.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://cdn.ampproject.org" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://firebase.googleapis.com/" />
      <link rel="preconnect" href="https://syndication.twitter.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

const ThirdPartyScripts = () => {
  const isProd = process.env.REACT_APP_ENV === 'production';

  return (
    <>
      <script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      ></script>

      <script
        async
        type="text/javascript"
        src="https://platform.instagram.com/en_US/embeds.js"
      ></script>
      <script
        async
        dangerouslySetInnerHTML={{
          __html: `window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],  t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s); js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            t._e = []; t.ready = function(f) {
              t._e.push(f);
            };
            return t;
          }(document, "script", "twitter-wjs"));
          `,
        }}
      />
      <script
        async
        dangerouslySetInnerHTML={{
          __html: `(function(i, s, o, g, r, a, m, n) {
              i.moengage_object = r;
              t = {};
              q = function(f) {
                  return function() {
                      (i.moengage_q = i.moengage_q || []).push({
                          f: f,
                          a: arguments
                      })
                  }
              };
              f = ['track_event', 'add_user_attribute', 'add_first_name', 'add_last_name', 'add_email', 'add_mobile', 'add_user_name', 'add_gender', 'add_birthday', 'destroy_session', 'add_unique_user_id', 'moe_events', 'call_web_push', 'track', 'location_type_attribute'], h = {
                  onsite: ["getData", "registerCallback"]
              };
              for (k in f) {
                  t[f[k]] = q(f[k])
              }
              for (k in h)
                  for (l in h[k]) {
                      null == t[k] && (t[k] = {}), t[k][h[k][l]] = q(k + "." + h[k][l])
                  }
              a = s.createElement(o);
              m = s.getElementsByTagName(o)[0];
              a.async = 1;
              a.src = g;
              m.parentNode.insertBefore(a, m);
              i.moe = i.moe || function() {
                  n = arguments[0];
                  return t
              };
              a.onload = function() {
                  if (n) {
                      i[r] = moe(n)
                  }
              }
          })(window, document, 'script', 'https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js', 'Moengage')
          `,
        }}
      />
      {!isProd && (
        <>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                  Moengage = moe({
                    app_id: "290OVXKXLGS4IAOHS9PMAT39_DEBUG",
                    debug_logs: 1
                  });
                `,
            }}
          />
          <script
            async
            type="text/javascript"
            src="https://www.googletagmanager.com/gtag/js?id=G-L93QRBE95X&amp;l=dataLayer&amp;cx=c"
          ></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-182136721-1"
          ></script>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-182136721-1', {
                    page_path: window.location.pathname,
                  });
                `,
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                gtag('event', 'conversion', {'send_to': 'UA-182136721-1/mtx-CLnr7YkCEIfjxb0B'});
                `,
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                  function gtag_report_conversion(url) {
                    var callback = function() {
                        if (typeof(url) != 'undefined') {
                            // window.location = url;
                        }
                    };
                    gtag('event', 'conversion', {
                        'send_to': 'UA-182136721-1/THxdCJrphP0BEIfjxb0B',
                        'event_callback': callback
                    });
                    return false;
                  }
                `,
            }}
          />
        </>
      )}
      {isProd && (
        <>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                    Moengage = moe({
                      app_id: "290OVXKXLGS4IAOHS9PMAT39",
                      debug_logs: 0
                  });
                `,
            }}
          />
          <script
            async
            type="text/javascript"
            src="https://www.googletagmanager.com/gtag/js?id=G-B5Z12ZR9X4&amp;l=dataLayer&amp;cx=c"
          ></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-179314757-2"
          ></script>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-179314757-2', {
                    page_path: window.location.pathname,
                  });
                `,
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                gtag('event', 'conversion', {'send_to': 'UA-179314757-2/mtx-CLnr7YkCEIfjxb0B'});
                `,
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                  function gtag_report_conversion(url) {
                    var callback = function() {
                        if (typeof(url) != 'undefined') {
                            // window.location = url;
                        }
                    };
                    gtag('event', 'conversion', {
                        'send_to': 'UA-179314757-2/THxdCJrphP0BEIfjxb0B',
                        'event_callback': callback
                    });
                    return false;
                  }
                `,
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                  ! function(f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function() {
                        n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                  }(window, document, 'script',
                      'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '194429445821310');
                  fbq('track', 'PageView');
                `,
            }}
          />
        </>
      )}
    </>
  );
};
