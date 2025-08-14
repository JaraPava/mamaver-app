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
    SECTIONS: [
      {
        id: 'home',
        title: 'HOME',
        items: [
          {
            route: '/home-page',
            icon: 'fas fa-home',
            label: 'Home Page',
            id: 'home-page'
          },
          {
            route: '/blog',
            icon: 'fas fa-blog',
            label: 'Blog',
            id: 'blog'
          },
          {
            route: '/blog-details',
            icon: 'fas fa-file-alt',
            label: 'Blog Details',
            id: 'blog-details'
          },
          {
            route: '/portfolio',
            icon: 'fas fa-briefcase',
            label: 'Portfolio',
            id: 'portfolio'
          },
          {
            route: '/contact',
            icon: 'fas fa-envelope',
            label: 'Contact',
            id: 'contact'
          }
        ]
      },
      {
        id: 'main',
        title: '', // Sin título visible para la sección principal
        items: [
          {
            route: '/analytical',
            icon: 'fas fa-globe',
            label: 'Analytical',
            id: 'analytical',
            isActive: true
          },
          {
            route: '/ecommerce',
            icon: 'fas fa-shopping-cart',
            label: 'eCommerce',
            id: 'ecommerce'
          },
          {
            route: '/frontend-pages',
            icon: 'fas fa-file-alt',
            label: 'Frontend pages',
            id: 'frontend-pages',
            hasSubmenu: true,
            submenu: [
              { route: '/frontend-pages/landing', label: 'Landing Page', id: 'landing' },
              { route: '/frontend-pages/pricing', label: 'Pricing', id: 'pricing' },
              { route: '/frontend-pages/about', label: 'About Us', id: 'about' }
            ]
          }
        ]
      },
      {
        id: 'apps',
        title: 'APPS',
        items: [
          {
            route: '/chat',
            icon: 'fas fa-comment-dots',
            label: 'Chat',
            id: 'chat'
          },
          {
            route: '/calendar',
            icon: 'fas fa-calendar-alt',
            label: 'Calendar',
            id: 'calendar'
          },
          {
            route: '/email',
            icon: 'fas fa-envelope',
            label: 'Email',
            id: 'email'
          },
          {
            route: '/kanban',
            icon: 'fas fa-columns',
            label: 'Kanban',
            id: 'kanban'
          },
          {
            route: '/contacts',
            icon: 'fas fa-address-book',
            label: 'Contacts',
            id: 'contacts'
          },
          {
            route: '/employee',
            icon: 'fas fa-users',
            label: 'Employee',
            id: 'employee'
          },
          {
            route: '/notes',
            icon: 'fas fa-sticky-note',
            label: 'Notes',
            id: 'notes'
          },
          {
            route: '/tickets',
            icon: 'fas fa-ticket-alt',
            label: 'Tickets',
            id: 'tickets'
          },
          {
            route: '/invoice',
            icon: 'fas fa-file-invoice',
            label: 'Invoice',
            id: 'invoice'
          },
          {
            route: '/user-profile',
            icon: 'fas fa-user',
            label: 'User Profile',
            id: 'user-profile',
            badge: {
              text: 'New',
              color: 'orange'
            }
          }
        ]
      },
      {
        id: 'tables',
        title: 'TABLES',
        items: [
          {
            route: '/tables/basic',
            icon: 'fas fa-table',
            label: 'Basic Tables',
            id: 'basic-tables'
          },
          {
            route: '/tables/data',
            icon: 'fas fa-database',
            label: 'Data Tables',
            id: 'data-tables'
          },
          {
            route: '/tables/responsive',
            icon: 'fas fa-mobile-alt',
            label: 'Responsive Tables',
            id: 'responsive-tables'
          },
          {
            route: '/tables/advanced',
            icon: 'fas fa-chart-bar',
            label: 'Advanced Tables',
            id: 'advanced-tables'
          }
        ]
      }
    ],
    // Mantener compatibilidad con la estructura anterior
    ITEMS: [
      // Home Section
      {
        route: '/home-page',
        icon: 'fas fa-home',
        label: 'Home Page',
        id: 'home-page'
      },
      {
        route: '/blog',
        icon: 'fas fa-blog',
        label: 'Blog',
        id: 'blog'
      },
      {
        route: '/blog-details',
        icon: 'fas fa-file-alt',
        label: 'Blog Details',
        id: 'blog-details'
      },
      {
        route: '/portfolio',
        icon: 'fas fa-briefcase',
        label: 'Portfolio',
        id: 'portfolio'
      },
      {
        route: '/contact',
        icon: 'fas fa-envelope',
        label: 'Contact',
        id: 'contact'
      },
      // Main Section
      {
        route: '/analytical',
        icon: 'fas fa-globe',
        label: 'Analytical',
        id: 'analytical'
      },
      {
        route: '/ecommerce',
        icon: 'fas fa-shopping-cart',
        label: 'eCommerce',
        id: 'ecommerce'
      },
      {
        route: '/frontend-pages',
        icon: 'fas fa-file-alt',
        label: 'Frontend pages',
        id: 'frontend-pages'
      },
      // Apps Section
      {
        route: '/chat',
        icon: 'fas fa-comment-dots',
        label: 'Chat',
        id: 'chat'
      },
      {
        route: '/calendar',
        icon: 'fas fa-calendar-alt',
        label: 'Calendar',
        id: 'calendar'
      },
      {
        route: '/email',
        icon: 'fas fa-envelope',
        label: 'Email',
        id: 'email'
      },
      {
        route: '/kanban',
        icon: 'fas fa-columns',
        label: 'Kanban',
        id: 'kanban'
      },
      {
        route: '/contacts',
        icon: 'fas fa-address-book',
        label: 'Contacts',
        id: 'contacts'
      },
      {
        route: '/employee',
        icon: 'fas fa-users',
        label: 'Employee',
        id: 'employee'
      },
      {
        route: '/notes',
        icon: 'fas fa-sticky-note',
        label: 'Notes',
        id: 'notes'
      },
      {
        route: '/tickets',
        icon: 'fas fa-ticket-alt',
        label: 'Tickets',
        id: 'tickets'
      },
      {
        route: '/invoice',
        icon: 'fas fa-file-invoice',
        label: 'Invoice',
        id: 'invoice'
      },
      {
        route: '/user-profile',
        icon: 'fas fa-user',
        label: 'User Profile',
        id: 'user-profile'
      },
      // Tables Section
      {
        route: '/tables/basic',
        icon: 'fas fa-table',
        label: 'Basic Tables',
        id: 'basic-tables'
      },
      {
        route: '/tables/data',
        icon: 'fas fa-database',
        label: 'Data Tables',
        id: 'data-tables'
      },
      {
        route: '/tables/responsive',
        icon: 'fas fa-mobile-alt',
        label: 'Responsive Tables',
        id: 'responsive-tables'
      },
      {
        route: '/tables/advanced',
        icon: 'fas fa-chart-bar',
        label: 'Advanced Tables',
        id: 'advanced-tables'
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
  readonly isActive?: boolean;
  readonly hasSubmenu?: boolean;
  readonly submenu?: readonly NavigationSubmenuItem[];
  readonly badge?: NavigationBadge;
}

export interface NavigationSubmenuItem {
  readonly route: string;
  readonly label: string;
  readonly id: string;
}

export interface NavigationBadge {
  readonly text: string;
  readonly color: 'orange' | 'blue' | 'green' | 'red';
}

export interface NavigationSection {
  readonly id: string;
  readonly title: string;
  readonly items: readonly NavigationItem[];
}

export type AppConfig = typeof APP_CONFIG;
