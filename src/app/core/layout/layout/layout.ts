import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { LayoutStateService } from '../layout/layout-state.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {

  readonly layoutState = inject(LayoutStateService);
}