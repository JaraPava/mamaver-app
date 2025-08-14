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
      margin-top: 60px; // Solo margen superior para el navbar
      margin-left: 250px; // Margen izquierdo para el sidebar
      transition: margin-left 0.3s ease;
      flex: 1;

      &.sidebar-collapsed {
        margin-left: 70px; // Margen reducido cuando el sidebar está colapsado
      }
      
      // Cuando el sidebar está en hover, ajustar como si estuviera expandido
      &.desktop-sidebar-hovered {
        margin-left: 250px;
      }
    }

    .content-wrapper {
      padding: 30px;
      min-height: calc(100vh - 140px); // Altura mínima considerando navbar y footer
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0 !important; // Sin margen izquierdo en móvil
        margin-top: 60px; // Mantener margen superior
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
