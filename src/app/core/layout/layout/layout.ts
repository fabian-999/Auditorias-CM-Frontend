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
    // Leaflet is loaded via CDN in index.html; declare L as any to avoid TS errors
    // @ts-ignore
    const L: any = (window as any).L;
    if (!L) return;
    const el = document.getElementById('epic-map');
    if (!el) return;

    // Ocaña coordinates
    const lat = 8.2311;
    const lon = -73.3569;

    const map = L.map(el, { zoomControl: true, attributionControl: false }).setView([lat, lon], 12);

    // Use CartoDB Voyager (no labels) tiles for a clean map without text labels
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Add a subtle marker (simple circle + popup)
    const marker = L.circleMarker([lat, lon], {
      radius: 10,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.9,
      weight: 2
    }).addTo(map);

    marker.bindPopup('<strong>Ocaña, Norte de Santander</strong>').openPopup();

    // Save map instance so it can be removed later if needed
    (this as any).__epicMap = map;
  }

  ngOnDestroy(): void {
    const map = (this as any).__epicMap;
    if (map) {
      map.remove();
    }
  }
}