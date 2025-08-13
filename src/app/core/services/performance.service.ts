import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { APP_CONFIG } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  
  private readonly MOBILE_BREAKPOINT = APP_CONFIG.MOBILE_BREAKPOINT;
  private readonly DEBOUNCE_TIME = APP_CONFIG.PERFORMANCE.DEBOUNCE_TIME;

  /**
   * Observable que emite cuando cambia el tamaño de pantalla (con debounce)
   */
  public readonly screenSize$: Observable<{ width: number; height: number; isMobile: boolean }> = 
    fromEvent(window, 'resize').pipe(
      debounceTime(this.DEBOUNCE_TIME),
      startWith(null), // Emitir valor inicial
      map(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= this.MOBILE_BREAKPOINT
      }))
    );

  /**
   * Verifica si estamos en un dispositivo móvil
   */
  public isMobile(): boolean {
    return window.innerWidth <= this.MOBILE_BREAKPOINT;
  }

  /**
   * Verifica si estamos en un dispositivo de escritorio
   */
  public isDesktop(): boolean {
    return window.innerWidth > this.MOBILE_BREAKPOINT;
  }

  /**
   * Ejecuta una función con requestAnimationFrame para mejor rendimiento
   */
  public requestAnimationFrame(callback: () => void): void {
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(callback);
    } else {
      setTimeout(callback, 16); // Fallback para entornos sin requestAnimationFrame
    }
  }

  /**
   * Debounce manual para funciones
   */
  public debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number = this.DEBOUNCE_TIME
  ): (...args: Parameters<T>) => void {
    let timeoutId: number | undefined;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => func.apply(this, args), delay);
    };
  }

  /**
   * Prefiere usar estrategias de cambio de detección eficientes
   */
  public isOnPushRecommended(): boolean {
    return APP_CONFIG.PERFORMANCE.CHANGE_DETECTION_STRATEGY === 'OnPush';
  }
}
