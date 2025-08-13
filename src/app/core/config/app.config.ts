// Configuración de la aplicación
export const APP_CONFIG = {
  // Configuración de responsive
  MOBILE_BREAKPOINT: 768,

  // Configuración de sidebar
  SIDEBAR: {
    COLLAPSED_WIDTH: '80px',
    EXPANDED_WIDTH: '280px',
    ANIMATION_DURATION: '0.3s'
  },

  // Configuración de navegación
  NAVIGATION: {
    ITEMS: [
      {
        route: '/dashboard',
        icon: 'fas fa-tachometer-alt',
        label: 'Dashboard',
        id: 'dashboard'
      },
      {
        route: '/users',
        icon: 'fas fa-users',
        label: 'Usuarios',
        id: 'users'
      },
      {
        route: '/settings',
        icon: 'fas fa-cog',
        label: 'Configuración',
        id: 'settings'
      }
    ]
  },

  // Configuración de la aplicación
  APP: {
    NAME: 'Admixion',
    LOGO_PATH: './logo.png',
    FALLBACK_LOGO: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQwKSIvPgo8cGF0aCBkPSJNMjAgMTBDMTYuNjg2MyAxMCAxNCAxMi42ODYzIDE0IDE2QzE0IDE5LjMxMzcgMTYuNjg2MyAyMiAyMCAyMkMyMy4zMTM3IDIyIDI2IDE5LjMxMzcgMjYgMTZDMjYgMTIuNjg2MyAyMy4zMTM3IDEwIDIwIDEwWiIgZmlsbD0id2hpdGUiLz4KPHN2Zz4KCg=='
  },

  // Configuración de rendimiento
  PERFORMANCE: {
    CHANGE_DETECTION_STRATEGY: 'OnPush',
    ENABLE_LAZY_LOADING: true,
    DEBOUNCE_TIME: 300,
    SASS_MODERN_FUNCTIONS: true // Usar funciones modernas de Sass
  },

  // Configuración de estilos
  STYLES: {
    COLOR_ADJUSTMENTS: {
      DARKEN_HOVER: 5,
      DARKEN_ACTIVE: 10,
      LIGHTEN_HOVER: 5
    },
    ANIMATIONS: {
      DURATION_FAST: '0.2s',
      DURATION_NORMAL: '0.3s',
      TIMING_FUNCTION: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
} as const;

// Tipos para TypeScript
export interface NavigationItem {
  readonly route: string;
  readonly icon: string;
  readonly label: string;
  readonly id: string;
}

export type AppConfig = typeof APP_CONFIG;
