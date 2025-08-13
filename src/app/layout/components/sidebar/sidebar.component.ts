import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../core/services/navigation.service';
import { NavigationItem, APP_CONFIG } from '../../../core/config/app.config';

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

  @Output() navigate = new EventEmitter<string>();
  @Output() closeSidebar = new EventEmitter<void>();

  // Inyección moderna de dependencias
  private readonly navigationService = inject(NavigationService);
  
  // Usar configuración centralizada
  readonly navigationItems = this.navigationService.navigationItems;
  readonly appName = APP_CONFIG.APP.NAME;
  readonly logoPath = APP_CONFIG.APP.LOGO_PATH;
  readonly fallbackLogo = APP_CONFIG.APP.FALLBACK_LOGO;

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

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }

  // Método optimizado para mostrar texto
  shouldShowText(): boolean {
    return (!this.isCollapsed && !this.isMobile) || (this.isMobile && this.isOpen);
  }

  // TrackBy function para mejor rendimiento en *ngFor
  trackByRoute(index: number, item: NavigationItem): string {
    return item.id;
  }
}
