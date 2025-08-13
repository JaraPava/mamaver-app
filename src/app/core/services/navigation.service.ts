import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { APP_CONFIG, NavigationItem } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly currentRouteSubject = new BehaviorSubject<string>('');
  
  public readonly currentRoute$: Observable<string> = this.currentRouteSubject.asObservable();
  
  // Usar configuración centralizada
  public readonly navigationItems: readonly NavigationItem[] = APP_CONFIG.NAVIGATION.ITEMS;

  constructor(private router: Router) {
    this.initRouteTracking();
  }

  private initRouteTracking(): void {
    // Establecer ruta inicial
    this.currentRouteSubject.next(this.router.url);
    
    // Suscribirse a cambios de ruta
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url),
        distinctUntilChanged()
      )
      .subscribe(url => this.currentRouteSubject.next(url));
  }

  public isActiveRoute(route: string): Observable<boolean> {
    return this.currentRoute$.pipe(
      map(currentRoute => currentRoute === route),
      distinctUntilChanged()
    );
  }

  public getCurrentRoute(): string {
    return this.currentRouteSubject.value;
  }

  public navigateTo(route: string): Promise<boolean> {
    return this.router.navigate([route]);
  }

  public getNavigationItemByRoute(route: string): NavigationItem | undefined {
    return this.navigationItems.find(item => item.route === route);
  }
}
