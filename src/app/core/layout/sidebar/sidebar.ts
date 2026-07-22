import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutStateService } from '../layout/layout-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {

  readonly layoutState = inject(LayoutStateService);

  readonly open = this.layoutState.sidebarOpen;

  toggleMenu(): void {
    this.layoutState.toggle();
  }
}