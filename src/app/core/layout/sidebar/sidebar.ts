import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { LayoutStateService } from '../layout/layout-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {
  private readonly layoutState = inject(LayoutStateService);
  private readonly router = inject(Router);

  readonly open = this.layoutState.sidebarOpen;

  toggleMenu(): void {
    this.layoutState.toggle();
  }

  logout(): void {
    this.toggleMenu();
    this.router.navigate(['/login']);
  }
}