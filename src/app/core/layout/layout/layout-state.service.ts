import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LayoutStateService {
  private readonly platformId = inject(PLATFORM_ID);
  
  // Señal de estado: única fuente de verdad para toda la app
  readonly sidebarOpen = signal<boolean>(this.loadInitialState());

  constructor() {
    // Sincronización reactiva con LocalStorage (segura para SSR)
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('sidebar_open', JSON.stringify(this.sidebarOpen()));
      }
    });
  }

  // API de mutación explícita
  open(): void {
    this.sidebarOpen.set(true);
  }

  close(): void {
    this.sidebarOpen.set(false);
  }

  toggle(): void {
    this.sidebarOpen.update(state => !state);
  }

  private loadInitialState(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const savedState = localStorage.getItem('sidebar_open');
      return savedState !== null ? JSON.parse(savedState) : true;
    }
    return true; 
  }
}