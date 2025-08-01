import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Verificar si hay un usuario guardado en localStorage solo en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.checkStoredAuth();
    }
  }

  private checkStoredAuth(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const storedUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }  login(credentials: LoginCredentials): Observable<boolean> {
    // Simulación de login - en producción esto sería una llamada HTTP
    if (credentials.email === 'admin@malecon.com' && credentials.password === 'admin123') {
      const user: User = {
        id: 1,
        email: credentials.email,
        name: 'Administrador',
        role: 'admin'
      };

      // Guardar en localStorage solo en el navegador
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', 'mock-jwt-token');
      }

      // Actualizar subjects
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);

      return of(true);
    }

    return of(false);
  }

  logout(): void {
    // Limpiar localStorage solo en el navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }

    // Actualizar subjects
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    // Redirigir al login
    this.router.navigate(['/auth/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('token');
  }
}
