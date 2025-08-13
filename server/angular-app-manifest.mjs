
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/malecon-magico-veracruz/',
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
    'index.csr.html': {size: 1118, hash: '112ea54524fc9e6c06b1ab1a33e4ae20655b8a0e1cc735953443a32c2589ce84', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1216, hash: '3cd9540dd525a622e179afdf41bc3312cf67126aa04bb36cdc5c3915a60f5688', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'users/index.html': {size: 17939, hash: '50030e239bcaf873200b6c4e6b6962e29c48bd89fd0abdb3345a4eecb7e86b9b', text: () => import('./assets-chunks/users_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 17939, hash: '50030e239bcaf873200b6c4e6b6962e29c48bd89fd0abdb3345a4eecb7e86b9b', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 17939, hash: '50030e239bcaf873200b6c4e6b6962e29c48bd89fd0abdb3345a4eecb7e86b9b', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 12709, hash: '304714c02587762067f7d3d736fbe0a829176d008c2d9fe0aef5b5d503cbac87', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 17939, hash: 'e1b143973fc9ebf078b491f0afb0911cce6e466c6145009b202349e36c92e6bf', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'styles-BYWG36OX.css': {size: 6184, hash: 'dge/kJveqws', text: () => import('./assets-chunks/styles-BYWG36OX_css.mjs').then(m => m.default)}
  },
};
