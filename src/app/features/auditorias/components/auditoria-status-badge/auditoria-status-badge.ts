import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { AuditStatus } from '../../models/auditoria.model';

@Component({
  selector: 'app-auditoria-status-badge',
  standalone: true,
  imports: [],
  templateUrl: './auditoria-status-badge.html',
  styleUrl: './auditoria-status-badge.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriaStatusBadge {
  readonly status = input.required<AuditStatus | string>();
}
