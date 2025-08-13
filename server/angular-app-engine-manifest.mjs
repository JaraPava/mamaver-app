
export default {
  basePath: '/malecon-magico-veracruz',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
