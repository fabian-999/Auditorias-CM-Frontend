import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-auditorias-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './auditorias-toolbar.html',
  styleUrl: './auditorias-toolbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriasToolbar {
  // Emisores reactivos modernos usando output() de Angular (sin @Output ni EventEmitter)
  readonly searchChange = output<string>();
  readonly openFilters = output<void>();
  readonly createAuditoria = output<void>();

  // Captura el valor del input y lo emite al componente padre
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value.trim());
  }
}
