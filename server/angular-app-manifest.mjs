
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://JaraPava.github.io/malecon-magico-veracruz/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/malecon-magico-veracruz/dashboard",
    "route": "/malecon-magico-veracruz"
  },
  {
    "renderMode": 2,
    "route": "/malecon-magico-veracruz/auth"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JFNB74UK.js"
    ],
    "route": "/malecon-magico-veracruz/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PGMM64FA.js"
    ],
    "route": "/malecon-magico-veracruz/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PGMM64FA.js"
    ],
    "route": "/malecon-magico-veracruz/users"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PGMM64FA.js"
    ],
    "route": "/malecon-magico-veracruz/settings"
  },
  {
    "renderMode": 2,
    "redirectTo": "/malecon-magico-veracruz/dashboard",
    "route": "/malecon-magico-veracruz/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1144, hash: '7d83f6701da96a7731edb0067f384e548e5dca0999222973c363b7bf310c2cb6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1242, hash: 'f06d645cc7ef9b69cddf9840cba2b1f11986470093454d92531611304f317790', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 17965, hash: 'd4eae5f88185229c9b8ff2bb6077d0c7c15908918c9379abc3e67723b58b8cbb', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 17965, hash: 'fe0cedfd05369769e63b2678c9d817a78757fff586b68487bdc20f74517d8643', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 17965, hash: 'd4eae5f88185229c9b8ff2bb6077d0c7c15908918c9379abc3e67723b58b8cbb', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'users/index.html': {size: 17965, hash: 'd4eae5f88185229c9b8ff2bb6077d0c7c15908918c9379abc3e67723b58b8cbb', text: () => import('./assets-chunks/users_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 12735, hash: '842c348e295e8d8d0036f54733e65b28300edba46ad1c9149d2a55ae4ab5344d', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'styles-BYWG36OX.css': {size: 6184, hash: 'dge/kJveqws', text: () => import('./assets-chunks/styles-BYWG36OX_css.mjs').then(m => m.default)}
  },
};
