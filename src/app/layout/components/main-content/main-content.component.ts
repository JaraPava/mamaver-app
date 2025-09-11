import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl:'./main-content.component.html',
  styles: [`
    .main-content {
      margin-top: var(--navbar-height, 60px);
      margin-left: var(--sidebar-width, 280px);
      transition: margin-left 0.15s ease;
      flex: 1;
      background: var(--theme-background);
      color: var(--theme-text-primary);
      height: calc(100vh - var(--navbar-height, 60px));
      overflow-y: auto;

      &.sidebar-collapsed {
        margin-left: var(--sidebar-collapsed-width, 110px);
      }

      // Cuando el sidebar está en hover, ajustar como si estuviera expandido
      &.desktop-sidebar-hovered {
        margin-left: var(--sidebar-width, 280px);
      }
    }

    .content-wrapper {
      min-height: 100%;
      background: var(--theme-background);
      transition: background-color 0.3s ease;
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0 !important;
        margin-top: var(--navbar-height, 60px);
        height: calc(100vh - var(--navbar-height, 60px));
      }
    }
  `]
})
export class MainContentComponent {
  @Input() isSidebarCollapsed = false;
  @Input() isSidebarHovered = false;
  @Input() isMobile = false;

  // Método para determinar si el contenido debe ajustarse como si el sidebar estuviera expandido
  shouldAdjustForExpandedSidebar(): boolean {
    if (this.isMobile) {
      return false; // En móviles no ajustar por hover
    }
    return !this.isSidebarCollapsed || this.isSidebarHovered;
  }
}
