import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { APP_CONFIG, NavigationItem, NavigationSection } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // Subjects para manejo del estado
  private readonly currentRouteSubject = new BehaviorSubject<string>('');
  public readonly expandedMenusSubject = new BehaviorSubject<Set<string>>(new Set());

  // Observables públicos
  public readonly currentRoute$ = this.currentRouteSubject.asObservable();
  public readonly expandedMenus$ = this.expandedMenusSubject.asObservable();

  // Configuración de navegación
  public readonly navigationSections: readonly NavigationSection[] = APP_CONFIG.NAVIGATION.SECTIONS;

  constructor(private router: Router) {
    this.initRouteTracking();
    this.setInitialRoute();
    
    // Forzar la evaluación inicial después de un tick
    setTimeout(() => {
      const currentRoute = this.router.url.split('?')[0].split('#')[0];
      this.currentRouteSubject.next(currentRoute);
    });
  }

  // Inicialización del tracking de rutas
  private initRouteTracking(): void {
    // Establecer ruta inicial inmediatamente
    const initialRoute = this.router.url.split('?')[0].split('#')[0];
    this.currentRouteSubject.next(initialRoute);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(event => event.url.split('?')[0].split('#')[0]), // Normalizar URL
        distinctUntilChanged()
      )
      .subscribe(url => {
        this.currentRouteSubject.next(url);
        this.autoExpandParentMenu(url);
      });
  }

  // Configuración inicial de la ruta
  private setInitialRoute(): void {
    const currentRoute = this.router.url;
    
    // Normalizar la ruta (eliminar parámetros de consulta y fragmentos)
    const normalizedRoute = currentRoute.split('?')[0].split('#')[0];
    
    if (normalizedRoute === '/' || normalizedRoute === '') {
      this.navigateTo('/analytical');
    } else {
      // Establecer la ruta actual inmediatamente
      this.currentRouteSubject.next(normalizedRoute);
      this.autoExpandParentMenu(normalizedRoute);
    }
  }

  // Auto-expansión de menús padre
  private autoExpandParentMenu(currentRoute: string): void {
    const parentItem = this.findParentMenuItem(currentRoute);
    if (parentItem) {
      this.expandMenu(parentItem.id);
    }
  }

  // Buscar elemento padre de una ruta
  private findParentMenuItem(route: string): NavigationItem | null {
    for (const section of this.navigationSections) {
      for (const item of section.items) {
        if (item.hasSubmenu && item.submenu?.some(subItem => subItem.route === route)) {
          return item;
        }
      }
    }
    return null;
  }

  // Métodos públicos optimizados
  getCurrentRoute = (): string => this.currentRouteSubject.value;

  navigateTo = (route: string): Promise<boolean> => this.router.navigate([route]);

  isActiveRoute = (route: string): Observable<boolean> =>
    this.currentRoute$.pipe(
      map(currentRoute => currentRoute === route),
      distinctUntilChanged()
    );

  toggleSubmenu = (itemId: string): void => {
    const expandedMenus = new Set(this.expandedMenusSubject.value);
    expandedMenus.has(itemId) ? expandedMenus.delete(itemId) : expandedMenus.add(itemId);
    this.expandedMenusSubject.next(expandedMenus);
  };

  expandMenu = (itemId: string): void => {
    const expandedMenus = new Set(this.expandedMenusSubject.value);
    expandedMenus.add(itemId);
    this.expandedMenusSubject.next(expandedMenus);
  };

  isSubmenuExpanded = (itemId: string): Observable<boolean> =>
    this.expandedMenus$.pipe(
      map(expandedMenus => expandedMenus.has(itemId)),
      distinctUntilChanged()
    );

  getNavigationItemByRoute = (route: string): NavigationItem | undefined => {
    for (const section of this.navigationSections) {
      const item = section.items.find(item => item.route === route);
      if (item) return item;
    }
    return undefined;
  };

  getAllNavigationItems = (): NavigationItem[] =>
    this.navigationSections.flatMap(section => section.items);
}
