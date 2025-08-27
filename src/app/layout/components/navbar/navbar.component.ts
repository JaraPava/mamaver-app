import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../core/services/auth.service';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

interface Notification {
  id: string;
  text: string;
  time: string;
  icon: string;
  read: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() currentUser: User | null = null;
  @Input() isSidebarCollapsed: boolean = false;
  @Input() isMobile: boolean = false;
  @Input() isSidebarOpen: boolean = false;
  @Input() isSidebarHovered: boolean = false;
  @Input() currentPage: string = 'Dashboard';

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  // Search functionality
  searchQuery: string = '';
  isSearchActive: boolean = false;
  searchResults: SearchResult[] = [];

  // Theme functionality
  isDarkMode: boolean = false;
  private themeCheckInterval: any;

  // Mobile functionality
  showMobileSearch: boolean = false;
  showMobileActions: boolean = false;
  @ViewChild('mobileSearchInput') mobileSearchInput!: ElementRef;

  // Notifications functionality
  showNotifications: boolean = false;
  unreadNotifications: number = 3;
  notifications: Notification[] = [
    {
      id: '1',
      text: 'Nueva venta registrada en el sistema',
      time: 'Hace 2 minutos',
      icon: 'fas fa-shopping-cart text-success',
      read: false
    },
    {
      id: '2',
      text: 'Reporte mensual generado exitosamente',
      time: 'Hace 1 hora',
      icon: 'fas fa-chart-line text-primary',
      read: false
    },
    {
      id: '3',
      text: 'Usuario nuevo registrado: María García',
      time: 'Hace 2 horas',
      icon: 'fas fa-user-plus text-info',
      read: false
    },
    {
      id: '4',
      text: 'Actualización del sistema completada',
      time: 'Ayer',
      icon: 'fas fa-download text-warning',
      read: true
    }
  ];

  // User menu functionality
  showUserMenu: boolean = false;

  // Mock data for search
  private searchData: SearchResult[] = [
    { id: '1', title: 'Dashboard', description: 'Panel principal del sistema', icon: 'fas fa-tachometer-alt', route: '/dashboard' },
    { id: '2', title: 'Usuarios', description: 'Gestión de usuarios del sistema', icon: 'fas fa-users', route: '/users' },
    { id: '3', title: 'Analytics', description: 'Análisis y estadísticas', icon: 'fas fa-chart-bar', route: '/analytical' },
    { id: '4', title: 'E-commerce', description: 'Gestión de productos y ventas', icon: 'fas fa-shopping-cart', route: '/ecommerce' },
    { id: '5', title: 'Configuración', description: 'Configuración del sistema', icon: 'fas fa-cog', route: '/settings' },
    { id: '6', title: 'Blog', description: 'Gestión de contenido del blog', icon: 'fas fa-blog', route: '/blog' },
    { id: '7', title: 'Tablas', description: 'Visualización de datos tabulares', icon: 'fas fa-table', route: '/tables/basic' },
    { id: '8', title: 'Contactos', description: 'Gestión de contactos', icon: 'fas fa-address-book', route: '/contacts' }
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize theme: check localStorage first, then time-based default
    this.initializeTheme();
    this.applyTheme();

    // Auto-update theme every minute to detect day/night changes
    this.startThemeAutoUpdate();

    // Update unread notifications count
    this.updateUnreadCount();
  }

  ngOnDestroy(): void {
    // Clear theme auto-update interval
    if (this.themeCheckInterval) {
      clearInterval(this.themeCheckInterval);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Close user menu if clicking outside
    if (!target.closest('.user-menu')) {
      this.showUserMenu = false;
    }

    // Close notifications if clicking outside
    if (!target.closest('.notifications-wrapper')) {
      this.showNotifications = false;
    }

    // Close search if clicking outside
    if (!target.closest('.search-container')) {
      this.isSearchActive = false;
    }

    // Close mobile actions if clicking outside
    if (!target.closest('.mobile-menu-toggle') && !target.closest('.mobile-actions')) {
      this.showMobileActions = false;
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    // Close mobile overlays on resize
    if (window.innerWidth > 768) {
      this.showMobileSearch = false;
      this.showMobileActions = false;
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onLogout(): void {
    this.showUserMenu = false;
    this.logout.emit();
  }

  // Search functionality
  onSearchFocus(): void {
    this.isSearchActive = true;
    if (this.searchQuery) {
      this.performSearch();
    }
  }

  onSearchBlur(): void {
    // Delay to allow clicking on search results
    setTimeout(() => {
      this.isSearchActive = false;
    }, 200);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.performSearch();
  }

  performSearch(): void {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.searchResults = this.searchData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    ).slice(0, 6); // Limit to 6 results
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
  }

  navigateToResult(result: SearchResult): void {
    this.router.navigate([result.route]);
    this.clearSearch();
    this.isSearchActive = false;
  }

  // Theme functionality
  toggleTheme(): void {
    // Cambio manual - guardar preferencia del usuario
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme-manual', 'true'); // Marcar como cambio manual
    this.applyTheme();
  }

  resetToAutoTheme(): void {
    // Resetear a modo automático basado en la hora
    localStorage.removeItem('theme-manual');
    this.isDarkMode = this.isNightTime();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();

    console.log(`🔄 Tema reseteado a automático: ${this.isDarkMode ? 'oscuro' : 'claro'}`);
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      // Si hay tema guardado, usar ese
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // Si no hay tema guardado, usar detección automática por hora
      this.isDarkMode = this.isNightTime();
      // Guardar la preferencia automática
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  private startThemeAutoUpdate(): void {
    // Verificar cada 60 segundos si ha cambiado la hora (de día a noche o viceversa)
    this.themeCheckInterval = setInterval(() => {
      const isManualChange = localStorage.getItem('theme-manual') === 'true';

      // Solo auto-actualizar si no ha sido cambiado manualmente
      if (!isManualChange) {
        const currentAutoTheme = this.isNightTime();

        if (this.isDarkMode !== currentAutoTheme) {
          this.isDarkMode = currentAutoTheme;
          localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
          this.applyTheme();

          console.log(`🌙 Tema cambiado automáticamente a: ${this.isDarkMode ? 'oscuro' : 'claro'} (${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')})`);
        }
      }
    }, 60000); // Verificar cada minuto
  }

  private shouldAutoUpdate(currentAutoTheme: boolean): boolean {
    // Solo auto-actualizar si el tema actual coincide con lo que sería automático
    // Esto evita cambiar si el usuario manualmente cambió el tema
    const previousAutoTheme = this.isNightTime();
    return this.isDarkMode === previousAutoTheme;
  }

  private isNightTime(): boolean {
    const now = new Date();
    const hour = now.getHours();

    // Modo oscuro de 6 PM (18:00) a 6 AM (06:00)
    return hour >= 16 || hour < 6;
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  // Notifications functionality
  toggleNotifications(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) {
      // Ajustar posición del dropdown para evitar que se salga de la pantalla
      setTimeout(() => {
        this.adjustNotificationDropdownPosition();
      }, 0);
    }
  }

  private adjustNotificationDropdownPosition(): void {
    const dropdown = document.querySelector('.notifications-dropdown') as HTMLElement;
    if (!dropdown) return;

    const rect = dropdown.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    // Si el dropdown se sale por la derecha en pantallas grandes
    if (window.innerWidth > 768 && rect.right > windowWidth - 20) {
      dropdown.setAttribute('data-position', 'left');
    } else {
      dropdown.removeAttribute('data-position');
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => notification.read = true);
    this.updateUnreadCount();
  }

  private updateUnreadCount(): void {
    this.unreadNotifications = this.notifications.filter(n => !n.read).length;
  }

  // User menu functionality
  toggleUserMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showUserMenu = !this.showUserMenu;
  }

  navigateToProfile(): void {
    this.router.navigate(['/user-profile']);
    this.showUserMenu = false;
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
    this.showUserMenu = false;
  }

  viewActivity(): void {
    // TODO: Implement activity view
    console.log('View activity clicked');
    this.showUserMenu = false;
  }

  // Mobile functionality
  toggleMobileSearch(): void {
    this.showMobileSearch = !this.showMobileSearch;
    this.showMobileActions = false; // Close actions when opening search

    if (this.showMobileSearch) {
      // Focus on search input after overlay opens
      setTimeout(() => {
        if (this.mobileSearchInput) {
          this.mobileSearchInput.nativeElement.focus();
        }
      }, 300);
    }
  }

  closeMobileSearch(): void {
    this.showMobileSearch = false;
    this.clearSearch();
  }

  toggleMobileActions(): void {
    this.showMobileActions = !this.showMobileActions;
    this.showMobileSearch = false; // Close search when opening actions
  }
}
