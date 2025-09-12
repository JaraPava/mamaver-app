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
  @Input() currentPage: string = '';

  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  // Theme functionality
  isDarkMode: boolean = false;

  // Search functionality
  searchQuery: string = '';
  showSearch: boolean = false;
  isSearchActive: boolean = false;
  searchResults: SearchResult[] = [];

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
      text: 'Backup programado completado',
      time: 'Hace 3 horas',
      icon: 'fas fa-database text-success',
      read: true
    },
    {
      id: '5',
      text: 'Actualización del sistema disponible',
      time: 'Ayer',
      icon: 'fas fa-download text-warning',
      read: true
    }
  ];

  // User menu functionality
  showUserMenu: boolean = false;

  // Search data
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme from localStorage:', savedTheme);
    this.isDarkMode = savedTheme === 'dark';
    console.log('isDarkMode set to:', this.isDarkMode);
    this.applyTheme();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    
    // Close search dropdown if clicking outside
    if (!target.closest('.search-container') && this.showSearch) {
      this.showSearch = false;
    }

    // Close notifications dropdown if clicking outside
    if (!target.closest('.notifications-wrapper') && this.showNotifications) {
      this.showNotifications = false;
    }

    // Close user menu if clicking outside
    if (!target.closest('.user-menu-wrapper') && this.showUserMenu) {
      this.showUserMenu = false;
    }

    // Close mobile actions if clicking outside
    if (!target.closest('.mobile-actions') && !target.closest('.mobile-menu-toggle') && this.showMobileActions) {
      this.showMobileActions = false;
    }
  }

  // Sidebar functionality
  onToggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  // Theme functionality
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    console.log('Theme changed to:', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      console.log('Applied dark theme attribute');
    } else {
      document.documentElement.removeAttribute('data-theme');
      console.log('Removed dark theme attribute');
    }
  }

  // Search functionality
  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    this.isSearchActive = this.showSearch;
    if (this.showSearch) {
      this.performSearch();
    }
  }

  onSearchFocus(): void {
    this.isSearchActive = true;
    this.showSearch = true;
  }

  onSearchBlur(): void {
    // Delay hiding to allow for click events on search results
    setTimeout(() => {
      this.isSearchActive = false;
      this.showSearch = false;
    }, 200);
  }

  onSearchInput(event: any): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.performSearch();
  }

  performSearch(query?: string): void {
    // Use provided query or current searchQuery
    const searchTerm = query || this.searchQuery;
    
    if (!searchTerm.trim()) {
      this.searchResults = [];
      return;
    }

    // Update searchQuery if a specific query was provided
    if (query) {
      this.searchQuery = query;
    }

    const searchQuery = searchTerm.toLowerCase();
    this.searchResults = this.searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
  }

  onSearchResultClick(result: SearchResult): void {
    this.navigateToResult(result);
    this.closeMobileSearch();
  }

  navigateToResult(result: SearchResult): void {
    this.router.navigate([result.route]);
    this.showSearch = false;
    this.clearSearch();
  }

  // Notifications functionality
  toggleNotifications(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showNotifications = !this.showNotifications;
  }

  markNotificationAsRead(notification: Notification, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    notification.read = true;
    this.updateUnreadCount();
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
    console.log('🚨 BOTÓN CLICKEADO!');
    console.log('🔍 toggleMobileSearch called!');
    console.log('📱 Current window width:', window.innerWidth);
    console.log('📊 showMobileSearch before toggle:', this.showMobileSearch);
    
    // Eliminar restricción temporalmente para debug
    this.showMobileSearch = !this.showMobileSearch;
    this.showMobileActions = false;
    
    console.log('✅ showMobileSearch after toggle:', this.showMobileSearch);
    console.log('🎯 Modal should be visible now!');
    
    // Forzar detección de cambios
    setTimeout(() => {
      console.log('⏰ After timeout - showMobileSearch:', this.showMobileSearch);
      const overlay = document.querySelector('.mobile-search-overlay');
      console.log('🔍 Overlay element found:', overlay);
      if (overlay) {
        console.log('📏 Overlay styles:', window.getComputedStyle(overlay).display);
      }
    }, 100);

    if (this.showMobileSearch) {
      setTimeout(() => {
        if (this.mobileSearchInput) {
          this.mobileSearchInput.nativeElement.focus();
          console.log('🔍 Search input focused');
        }
      }, 300);
    }
  }

  closeMobileSearch(): void {
    this.showMobileSearch = false;
    this.searchQuery = '';
    this.searchResults = [];
  }

  toggleMobileActions(): void {
    this.showMobileActions = !this.showMobileActions;
    this.showMobileSearch = false; // Close search when opening actions
  }

  // Logout functionality
  onLogout(): void {
    this.logout.emit();
  }
}
