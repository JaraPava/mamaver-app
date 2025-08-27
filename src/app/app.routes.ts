import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent),
        canActivate: [loginGuard]
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/analytical',
        pathMatch: 'full'
      },
      // Navegación Principal
      {
        path: 'analytical',
        loadComponent: () => import('./features/analytical/analytical.component').then(m => m.AnalyticalComponent)
      },
      {
        path: 'ecommerce',
        loadComponent: () => import('./features/ecommerce/ecommerce.component').then(m => m.EcommerceComponent)
      },
      {
        path: 'frontend-pages',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/frontend-pages/frontend-pages.component').then(m => m.FrontendPagesComponent)
          },
          {
            path: 'home-page',
            loadComponent: () => import('./features/home-page/home-page.component').then(m => m.HomePageComponent)
          },
          {
            path: 'blog',
            loadComponent: () => import('./features/blog/blog.component').then(m => m.BlogComponent)
          },
          {
            path: 'blog-details',
            loadComponent: () => import('./features/blog-details/blog-details.component').then(m => m.BlogDetailsComponent)
          },
          {
            path: 'portfolio',
            loadComponent: () => import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent)
          },
          {
            path: 'contact',
            loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
          },
          {
            path: 'landing',
            loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
          },
          {
            path: 'pricing',
            loadComponent: () => import('./features/frontend-pages/pricing/pricing.component').then(m => m.PricingComponent)
          },
          {
            path: 'about',
            loadComponent: () => import('./features/frontend-pages/about/about.component').then(m => m.AboutComponent)
          }
        ]
      },
      // Apps
      {
        path: 'chat',
        loadComponent: () => import('./features/chat/chat.component').then(m => m.ChatComponent)
      },
      {
        path: 'calendar',
        loadComponent: () => import('./features/calendar/calendar.component').then(m => m.CalendarComponent)
      },
      {
        path: 'email',
        loadComponent: () => import('./features/email/email.component').then(m => m.EmailComponent)
      },
      {
        path: 'kanban',
        loadComponent: () => import('./features/kanban/kanban.component').then(m => m.KanbanComponent)
      },
      {
        path: 'contacts',
        loadComponent: () => import('./features/contacts/contacts.component').then(m => m.ContactsComponent)
      },
      {
        path: 'employee',
        loadComponent: () => import('./features/employee/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'notes',
        loadComponent: () => import('./features/notes/notes.component').then(m => m.NotesComponent)
      },
      {
        path: 'tickets',
        loadComponent: () => import('./features/tickets/tickets.component').then(m => m.TicketsComponent)
      },
      {
        path: 'invoice',
        loadComponent: () => import('./features/invoice/invoice.component').then(m => m.InvoiceComponent)
      },
      {
        path: 'user-profile',
        loadComponent: () => import('./features/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      },
      // Tables
      {
        path: 'tables',
        children: [
          {
            path: 'basic',
            loadComponent: () => import('./features/tables/basic-tables.component').then(m => m.BasicTablesComponent)
          },
          {
            path: 'data',
            loadComponent: () => import('./features/tables/data-tables.component').then(m => m.DataTablesComponent)
          },
          {
            path: 'responsive',
            loadComponent: () => import('./features/tables/responsive-tables.component').then(m => m.ResponsiveTablesComponent)
          },
          {
            path: 'advanced',
            loadComponent: () => import('./features/tables/advanced-tables.component').then(m => m.AdvancedTablesComponent)
          }
        ]
      },
      // Rutas existentes para compatibilidad
      {
        path: 'dashboard',
        redirectTo: '/analytical',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: 'landing',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
