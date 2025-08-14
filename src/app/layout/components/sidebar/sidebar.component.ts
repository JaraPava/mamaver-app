import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../core/services/navigation.service';
import { NavigationItem, NavigationSection, APP_CONFIG } from '../../../core/config/app.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
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

  // Inyección moderna de dependencias
  private readonly navigationService = inject(NavigationService);
  
  // Usar configuración centralizada con secciones
  readonly navigationSections = this.navigationService.navigationSections;
  readonly navigationItems = this.navigationService.navigationItems;
  readonly appName = APP_CONFIG.APP.NAME;
  readonly logoPath = APP_CONFIG.APP.LOGO_PATH;
  readonly fallbackLogo = APP_CONFIG.APP.FALLBACK_LOGO;

  // Propiedades del usuario
  readonly userName = 'Mathew';
  readonly userRole = 'Designer';
  readonly userAvatarPath = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format';
  readonly fallbackAvatar = 'https://ui-avatars.com/api/?name=Mathew&background=6366f1&color=fff&size=150';

  onNavigate(route: string): void {
    this.navigate.emit(route);
  }

  onCloseSidebar(): void {
    this.closeSidebar.emit();
  }

  onImageError(event: any): void {
    console.log('Logo not found, using fallback');
    event.target.src = this.fallbackLogo;
  }

  onUserAvatarError(event: any): void {
    console.log('User avatar not found, using fallback');
    event.target.src = this.fallbackAvatar;
  }

  onLogout(): void {
    console.log('Logout clicked');
    this.logout.emit();
  }

  onMouseEnter(): void {
    this.mouseEnter.emit();
  }

  onMouseLeave(): void {
    this.mouseLeave.emit();
  }

  onToggleSubmenu(itemId: string): void {
    this.navigationService.toggleSubmenu(itemId);
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }

  isSubmenuExpanded(itemId: string): boolean {
    // Accedemos directamente al BehaviorSubject público
    return this.navigationService.expandedMenusSubject.value.has(itemId);
  }

  // Método optimizado para mostrar texto
  shouldShowText(): boolean {
    if (this.isMobile) {
      return this.isOpen;
    }
    // En desktop, mostrar texto si no está colapsado o si está en hover
    return this.shouldShowExpanded;
  }

  // TrackBy functions para mejor rendimiento en *ngFor
  trackByRoute(index: number, item: NavigationItem): string {
    return item.id;
  }

  trackBySection(index: number, section: NavigationSection): string {
    return section.id;
  }
}
