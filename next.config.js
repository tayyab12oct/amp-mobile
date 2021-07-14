// const webpack = require('webpack');
// const pkg = require('./package.json');
// // const buildTag = Math.random()
// //     .toString(36)
// //     .substring(2, 15);

// // const withPlugins = require("next-compose-plugins");
// // const withBundleAnalyzer = require("@next/bundle-analyzer");
// // let isMobileView = (ctx.req ? ctx.req.headers['user-agent']
// //     : navigator.userAgent).match(
// //       /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
// //     )

// // env config
// const environment = process.env.env || process.env.ENV;

// let envPath = './.env.development';
// let assetPath = '';
// const isProd = environment === 'production';
// const isPreProd = environment === 'preprod';
// const isStaging = environment === 'staging';

// if (isProd) {
//     envPath = './.env.production';
//     assetPath = 'https://images.ottplay.com/cdn/prod';
// } else if (isPreProd) {
//     envPath = './.env.preprod';
//     assetPath = 'https://images.ottplay.com/cdn/preprod';
// } else if (isStaging) {
//     envPath = './.env.staging';
//     assetPath = 'https://images.ottplay.com/cdn/staging';
// }

// const { parsed: myEnv } = require('dotenv').config({
//     path: envPath,
// });

// // console.log('path ', myEnv);

// module.exports = {
//     future: {
//         webpack5: true,
//     },
//     generateBuildId: () => pkg.version.split('.').join('a'),
//     // generateBuildId: buildTag,
//     poweredByHeader: isStaging ? true : false,
//     productionBrowserSourceMaps: isStaging ? true : false,
//     // Use the CDN in production and localhost for development.
//     assetPrefix: assetPath,
//     // assetPrefix: isStaging ? 'https://images.ottplay.com/cdn/test' : '',
//     // distDir: 'build',
//     // pageExtension: ['jsx', 'js', 'ts', 'tsx'],
//     // reactStrictMode: true,
//     //loader: 'akamai',
//     //domains: ['images.ottplay.com'],
//     onDemandEntries: {
//         maxInactiveAge: 25 * 1000,
//         pagesBufferLength: 2,
//     },
//     // async rewrites() {
//     //     return {
//     //         beforeFiles: [{
//     //                 source: '/',
//     //                 destination: '/home',
//     //             },
//     //             {
//     //                 source: '/home',
//     //                 has: [{
//     //                     type: 'header',
//     //                     key: 'user-agent',
//     //                     value: '/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i',
//     //                     value:  '(?<token>[^ $]*)'
//     //                 }, ],
//     //                 destination: '/home',
//     //             },
//     //             {
//     //                 source: 'https://images.ottplay.com/cdn/test/_next/webpack.*',
//     //                 destination: 'https://ottplay.com/_next/webpack',
//     //             },
//     //         ],
//     //     };
//     // },
//     async redirects() {
//         return [{
//             source: '/home',
//             destination: '/',
//             permanent: true,
//         }, ];
//     },
//     serverRuntimeConfig: {
//         // Will only be available on the server side
//     },
//     publicRuntimeConfig: {
//         // Will be available on both server and client
//         ...myEnv,
//     },
//     compilerOptions: {
//         baseUrl: '.',
//     },
//     webpack: (config) => {
//         config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
//         return config;
//     },
// };

module.exports = {
    serverRuntimeConfig: {
      // Will only be available on the server side
      mySecret: 'secret',
      secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      staticFolder: '/static',
    },
  }