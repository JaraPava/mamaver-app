import { Component, OnInit, OnDestroy, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService, User } from '../core/services/auth.service';
import { NavigationService } from '../core/services/navigation.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
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
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isSidebarCollapsed = false;
  isMobile = false;
  isSidebarOpen = false; // Para controlar apertura en móviles
  currentRoute = '';
  private routerSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();

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

    // Usar el servicio de navegación optimizado
    this.routerSubscription = this.navigationService.currentRoute$.subscribe((route) => {
      this.currentRoute = route;
      this.cdr.markForCheck();
    });
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
  }
}
