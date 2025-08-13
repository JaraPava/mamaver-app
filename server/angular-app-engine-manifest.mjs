
export default {
  basePath: 'https://JaraPava.github.io/malecon-magico-veracruz',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
