import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../core/services/navigation.service';
import { NavigationItem, NavigationSection, APP_CONFIG } from '../../../core/config/app.config';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() currentRoute = '';
  @Input() isCollapsed = false;
  @Input() isMobile = false;
  @Input() isOpen = true;
  @Input() isHovered = false;
  @Input() shouldShowExpanded = true;

  @Output() navigate = new EventEmitter<string>();
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() mouseEnter = new EventEmitter<void>();
  @Output() mouseLeave = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  // Servicios y configuración
  private readonly navigationService = inject(NavigationService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  readonly navigationSections = this.navigationService.navigationSections;

  // Ruta actual desde el servicio (para asegurar sincronización)
  private actualCurrentRoute = '';
  private routeSubscription: Subscription = new Subscription();

  // Configuración de la aplicación
  readonly appConfig = {
    name: APP_CONFIG.APP.NAME,
    logoPath: APP_CONFIG.APP.LOGO_PATH,
    fallbackLogo: APP_CONFIG.APP.FALLBACK_LOGO
  };

  // Información del usuario
  readonly userInfo = {
    name: 'Mathew',
    role: 'Designer',
    avatarPath: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
    fallbackAvatar: 'https://ui-avatars.com/api/?name=Mathew&background=6366f1&color=fff&size=150'
  };

  ngOnInit(): void {
    // Obtener la ruta actual inmediatamente desde el router
    this.actualCurrentRoute = this.router.url.split('?')[0].split('#')[0];
    
    // Suscribirse a los cambios de ruta para asegurar sincronización continua
    this.routeSubscription = this.navigationService.currentRoute$.subscribe(route => {
      this.actualCurrentRoute = route;
      this.cdr.markForCheck(); // Forzar detección de cambios
    });
  }

  ngAfterViewInit(): void {
    // Forzar una detección de cambios después de que la vista se haya inicializado
    // Esto garantiza que el estado activo se muestre correctamente
    setTimeout(() => {
      this.actualCurrentRoute = this.router.url.split('?')[0].split('#')[0];
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  // Métodos de navegación optimizados
  onNavigate = (route: string): void => this.navigate.emit(route);
  onCloseSidebar = (): void => this.closeSidebar.emit();
  onMouseEnter = (): void => this.mouseEnter.emit();
  onMouseLeave = (): void => this.mouseLeave.emit();
  onLogout = (): void => this.logout.emit();

  // Manejo de errores de imágenes
  onImageError = (event: Event): void => {
    (event.target as HTMLImageElement).src = this.appConfig.fallbackLogo;
  };

  onUserAvatarError = (event: Event): void => {
    (event.target as HTMLImageElement).src = this.userInfo.fallbackAvatar;
  };

  // Lógica de submenús
  onToggleSubmenu = (itemId: string): void => {
    this.navigationService.toggleSubmenu(itemId);
  };

  isSubmenuExpanded = (itemId: string): boolean => {
    return this.navigationService.expandedMenusSubject.value.has(itemId);
  };

  // Verificación de rutas activas (con respaldo del servicio y router directo)
  isActiveRoute = (route: string): boolean => {
    // Prioridad: 1) Router directo, 2) Input currentRoute, 3) Servicio actualCurrentRoute
    const routerUrl = this.router.url.split('?')[0].split('#')[0];
    const currentRouteToCheck = routerUrl || this.currentRoute || this.actualCurrentRoute;
    
    return currentRouteToCheck === route;
  };

  isActiveOrHasActiveSubmenu = (item: NavigationItem): boolean => {
    return this.isActiveRoute(item.route) ||
           (item.hasSubmenu && item.submenu?.some(subItem => this.isActiveRoute(subItem.route))) || false;
  };

  // Control de visibilidad del texto
  shouldShowText = (): boolean => {
    return this.isMobile ? this.isOpen : this.shouldShowExpanded;
  };

  // TrackBy functions para rendimiento
  trackByRoute = (_: number, item: NavigationItem): string => item.id;
  trackBySection = (_: number, section: NavigationSection): string => section.id;

  // Método de debug (comentado en producción)
  // getCurrentRouteForDebug = (): string => {
  //   const routerUrl = this.router.url.split('?')[0].split('#')[0];
  //   return `Router: ${routerUrl} | Input: ${this.currentRoute} | Service: ${this.actualCurrentRoute}`;
  // };
}
