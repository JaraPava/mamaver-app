import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { APP_CONFIG, NavigationItem, NavigationSection } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly currentRouteSubject = new BehaviorSubject<string>('');
  public readonly expandedMenusSubject = new BehaviorSubject<Set<string>>(new Set());
  
  public readonly currentRoute$: Observable<string> = this.currentRouteSubject.asObservable();
  public readonly expandedMenus$: Observable<Set<string>> = this.expandedMenusSubject.asObservable();
  
  // Usar configuración centralizada con secciones
  public readonly navigationSections: readonly NavigationSection[] = APP_CONFIG.NAVIGATION.SECTIONS;
  public readonly navigationItems: readonly NavigationItem[] = APP_CONFIG.NAVIGATION.ITEMS;

  constructor(private router: Router) {
    this.initRouteTracking();
    this.setInitialActiveRoute();
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

  private setInitialActiveRoute(): void {
    // Si no hay ruta actual, navegar a Analytical como ruta por defecto
    const currentRoute = this.router.url;
    if (currentRoute === '/' || currentRoute === '') {
      this.navigateTo('/analytical');
    }
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
    // Buscar en todas las secciones
    for (const section of this.navigationSections) {
      const item = section.items.find(item => item.route === route);
      if (item) return item;
    }
    return undefined;
  }

  public toggleSubmenu(itemId: string): void {
    const expandedMenus = new Set(this.expandedMenusSubject.value);
    
    if (expandedMenus.has(itemId)) {
      expandedMenus.delete(itemId);
    } else {
      expandedMenus.add(itemId);
    }
    
    this.expandedMenusSubject.next(expandedMenus);
  }

  public isSubmenuExpanded(itemId: string): Observable<boolean> {
    return this.expandedMenus$.pipe(
      map(expandedMenus => expandedMenus.has(itemId)),
      distinctUntilChanged()
    );
  }

  public getAllNavigationItems(): NavigationItem[] {
    const allItems: NavigationItem[] = [];
    this.navigationSections.forEach(section => {
      allItems.push(...section.items);
    });
    return allItems;
  }
}
