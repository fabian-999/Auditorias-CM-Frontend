import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { LayoutStateService } from '../layout/layout-state.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {

  readonly layoutState = inject(LayoutStateService);
  private readonly router = inject(Router);

  showSidebar(): boolean {
    return !this.router.url.startsWith('/login');
  }

  showHeader(): boolean {
    return !this.router.url.startsWith('/login');
  }

  showFooter(): boolean {
    return !this.router.url.startsWith('/login');
  }

  showMap(): boolean {
    return !this.router.url.startsWith('/login');
  }
}