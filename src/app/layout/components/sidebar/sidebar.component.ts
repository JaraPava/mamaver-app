import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Input() isMobile = false;
  @Input() isOpen = true;

  @Output() navigate = new EventEmitter<string>();
  @Output() closeSidebar = new EventEmitter<void>();

  onNavigate(route: string): void {
    this.navigate.emit(route);
  }

  onCloseSidebar(): void {
    this.closeSidebar.emit();
  }
}
