import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuditoriasToolbar } from '../../components/auditorias-toolbar/auditorias-toolbar';

@Component({
  selector: 'app-auditorias',
  standalone: true,
  imports: [AuditoriasToolbar],
  templateUrl: './auditorias.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Auditorias {

  onSearch(termino: string): void {
    console.log('Buscando:', termino);
  }

  onOpenFilters(): void {
    console.log('Abriendo filtros...');
  }

  onOpenCreateModal(): void {
    console.log('Abriendo modal de nueva auditoría...');
  }

}