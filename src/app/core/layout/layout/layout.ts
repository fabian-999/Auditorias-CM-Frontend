import { Component, ChangeDetectionStrategy, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { LayoutStateService } from '../layout/layout-state.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgIf, Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {

  readonly layoutState = inject(LayoutStateService);
  private readonly router = inject(Router);

  showSidebar(): boolean {
    return !this.router.url.startsWith('/login');
  }
  // Initialize an interactive Leaflet map into the #epic-map container
  ngAfterViewInit(): void {
    const el = document.getElementById('epic-map');
    if (!el) return;

    const lat = 8.2311;
    const lon = -73.3569;

    const createMap = () => {
      // @ts-ignore
      const L: any = (window as any).L;
      if (!L) return;

      // avoid double init
      if ((this as any).__epicMap) return;

      const map = L.map(el, { zoomControl: true, attributionControl: true }).setView([lat, lon], 12);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      const marker = L.circleMarker([lat, lon], {
        radius: 10,
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.9,
        weight: 2
      }).addTo(map);

      (this as any).__epicMap = map;

      setTimeout(() => map.invalidateSize(), 250);
      const resizeHandler = () => map.invalidateSize();
      window.addEventListener('resize', resizeHandler);
      (this as any).__resizeHandler = resizeHandler;
    };

    // Ensure Leaflet CSS is present
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // If Leaflet already loaded, create map immediately
    // @ts-ignore
    if ((window as any).L) {
      createMap();
      return;
    }

    // Otherwise load Leaflet script dynamically and initialize when ready
    if (!document.querySelector('script[data-leaflet]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.setAttribute('data-leaflet', '1');
      script.onload = () => createMap();
      document.body.appendChild(script);
    } else {
      const existing = document.querySelector('script[data-leaflet]') as HTMLScriptElement;
      existing.addEventListener('load', () => createMap());
    }
  }

  ngOnDestroy(): void {
    const map = (this as any).__epicMap;
    if (map) {
      map.remove();
    }
    const handler = (this as any).__resizeHandler;
    if (handler) window.removeEventListener('resize', handler);
  }
}