import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../core/services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';

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
  templateUrl: './layout.component.html'
})

export class LayoutComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isSidebarCollapsed = false;
  isMobile = false;
  isSidebarOpen = false; // Para controlar apertura en móviles

  constructor(private authService: AuthService, private router: Router) {}

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones si es necesario
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
    this.router.navigate([route]);
    // Cerrar sidebar en móviles después de navegar
    if (this.isMobile) {
      this.isSidebarOpen = false;
    }
  }
}
