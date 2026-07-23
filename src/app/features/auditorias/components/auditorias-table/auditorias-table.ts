import { Component, inject, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Audit } from '../../models/auditoria.model';
import { Auditorias } from '../../services/auditorias';
import { AuditoriaStatusBadge } from '../auditoria-status-badge/auditoria-status-badge';

@Component({
  selector: 'app-auditorias-table',
  standalone: true,
  imports: [AuditoriaStatusBadge, DatePipe],
  templateUrl: './auditorias-table.html',
  styleUrl: './auditorias-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriasTable {
  private auditoriasService = inject(Auditorias);

  readonly searchQuery = input<string>('');

  readonly editAuditoria = output<Audit>();
  readonly deleteAuditoria = output<Audit>();

  readonly auditorias = this.auditoriasService.auditorias;
  readonly loading = this.auditoriasService.loading;
  readonly error = this.auditoriasService.error;

  readonly filteredAuditorias = computed(() => {
    const list = this.auditorias();
    const query = this.searchQuery().toLowerCase().trim();

    if (!query) {
      return list;
    }

    return list.filter((audit) => {
      const titleMatch = audit.title?.toLowerCase().includes(query);
      const puntoMatch = audit.punto?.toLowerCase().includes(query);
      const processMatch = audit.process?.toLowerCase().includes(query);
      const statusMatch = audit.status?.toLowerCase().includes(query);
      return titleMatch || puntoMatch || processMatch || statusMatch;
    });
  });

  onEdit(auditoria: Audit): void {
    this.editAuditoria.emit(auditoria);
  }

  onDelete(auditoria: Audit): void {
    this.deleteAuditoria.emit(auditoria);
  }
}