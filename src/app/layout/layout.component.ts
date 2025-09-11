import { Component, OnInit, OnDestroy, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService, User } from '../core/services/auth.service';
import { NavigationService } from '../core/services/navigation.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SidebarComponent,
    MainContentComponent,
  ],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isSidebarCollapsed = false;
  isMobile = false;
  isSidebarOpen = false; // Para controlar apertura en móviles
  isSidebarHovered = false; // Para controlar hover en desktop
  currentRoute = '';
  currentPageTitle = 'Dashboard';
  private routerSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();

  // Mapeo de rutas a títulos de página
  private routeToPageTitle: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/analytical': 'Analytics',
    '/users': 'Usuarios',
    '/ecommerce': 'E-commerce',
    '/settings': 'Configuración',
    '/blog': 'Blog',
    '/blog-details': 'Detalles del Blog',
    '/contacts': 'Contactos',
    '/user-profile': 'Perfil de Usuario',
    '/tables/basic': 'Tablas Básicas',
    '/tables/advanced': 'Tablas Avanzadas',
    '/tables/responsive': 'Tablas Responsivas',
    '/home-page': 'Página de Inicio',
    '/frontend-pages': 'Páginas Frontend',
    '/frontend-pages/landing': 'Landing Page',
    '/frontend-pages/about': 'Acerca de',
    '/frontend-pages/pricing': 'Precios',
    '/calendar': 'Calendario',
    '/chat': 'Chat',
    '/email': 'Email',
    '/invoice': 'Facturas',
    '/kanban': 'Kanban',
    '/notes': 'Notas',
    '/portfolio': 'Portfolio',
    '/tickets': 'Tickets',
    '/employee': 'Empleados'
  };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private navigationService: NavigationService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
    
    // Suscripción optimizada al usuario actual
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.cdr.markForCheck();
    });

    // Usar el servicio de navegación optimizado y actualizar título de página
    this.routerSubscription = this.navigationService.currentRoute$.subscribe((route) => {
      this.currentRoute = route;
      this.updatePageTitle(route);
      this.cdr.markForCheck();
    });

    // También suscribirse a eventos de navegación para capturar cambios inmediatos
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updatePageTitle(event.url);
      this.cdr.markForCheck();
    });
  }

  private updatePageTitle(route: string): void {
    // Limpiar query params y fragmentos
    const cleanRoute = route.split('?')[0].split('#')[0];
    
    // Buscar título exacto o buscar por coincidencia parcial
    this.currentPageTitle = this.routeToPageTitle[cleanRoute] || 
                           this.findPartialMatch(cleanRoute) || 
                           'Dashboard';
  }

  private findPartialMatch(route: string): string | null {
    // Buscar coincidencias parciales para rutas dinámicas
    for (const [key, value] of Object.entries(this.routeToPageTitle)) {
      if (route.startsWith(key) || key.startsWith(route)) {
        return value;
      }
    }
    return null;
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }

  ngOnDestroy(): void {
    // Limpiar todas las suscripciones
    this.routerSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    
    // En móviles, cerrar sidebar por defecto
    if (this.isMobile) {
      this.isSidebarOpen = false;
    } else {
      // En pantallas grandes, sidebar siempre visible
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      // En móviles, controlar apertura/cierre
      this.isSidebarOpen = !this.isSidebarOpen;
    } else {
      // En pantallas grandes, controlar colapso
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  closeSidebar(): void {
    if (this.isMobile) {
      this.isSidebarOpen = false;
    }
  }

  onContentClick(): void {
    // En móviles, cerrar sidebar cuando se hace click en el contenido y el sidebar está abierto
    if (this.isMobile && this.isSidebarOpen) {
      this.isSidebarOpen = false;
      this.cdr.markForCheck();
    }
  }

  onNavbarClick(event: Event): void {
    // En móviles con sidebar abierto, prevenir eventos del navbar
    if (this.isMobile && this.isSidebarOpen) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
    // Cerrar sidebar en móviles después de navegar
    if (this.isMobile) {
      this.isSidebarOpen = false;
      this.cdr.markForCheck();
    }
    // En desktop, si el sidebar está colapsado y se hizo hover, mantenerlo colapsado después de navegar
    else if (this.isSidebarCollapsed && this.isSidebarHovered) {
      this.isSidebarHovered = false;
      this.cdr.markForCheck();
    }
  }

  // Métodos para manejar hover del sidebar (solo desktop)
  onSidebarMouseEnter(): void {
    if (!this.isMobile && this.isSidebarCollapsed) {
      this.isSidebarHovered = true;
      this.cdr.markForCheck();
    }
  }

  onSidebarMouseLeave(): void {
    if (!this.isMobile && this.isSidebarCollapsed) {
      this.isSidebarHovered = false;
      this.cdr.markForCheck();
    }
  }

  // Método para verificar si el sidebar debe mostrarse expandido
  shouldShowExpandedSidebar(): boolean {
    if (this.isMobile) {
      return this.isSidebarOpen;
    }
    return !this.isSidebarCollapsed || this.isSidebarHovered;
  }
}
