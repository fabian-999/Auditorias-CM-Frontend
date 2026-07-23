import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Audit } from '../../models/auditoria.model';

@Component({
  selector: 'app-auditoria-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './auditoria-delete-modal.html',
  styleUrl: './auditoria-delete-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriaDeleteModal {
  readonly isOpen = input<boolean>(false);
  readonly auditoriaToDelete = input<Audit | null>(null);

  readonly close = output<void>();
  readonly confirmDelete = output<string>();

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    const item = this.auditoriaToDelete();
    if (item) {
      this.confirmDelete.emit(item.id);
    }
  }
}
