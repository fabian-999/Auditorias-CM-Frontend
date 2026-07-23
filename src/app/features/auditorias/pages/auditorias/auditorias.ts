import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { AuditoriasToolbar } from '../../components/auditorias-toolbar/auditorias-toolbar';
import { AuditoriasTable } from '../../components/auditorias-table/auditorias-table';
import { AuditoriaFormModal, AuditFormSubmitEvent } from '../../components/auditoria-form-modal/auditoria-form-modal';
import { AuditoriaDeleteModal } from '../../components/auditoria-delete-modal/auditoria-delete-modal';
import { Auditorias as AuditoriasService } from '../../services/auditorias';
import { Audit, CreateAuditDto } from '../../models/auditoria.model';

@Component({
  selector: 'app-auditorias',
  standalone: true,
  imports: [
    AuditoriasToolbar,
    AuditoriasTable,
    AuditoriaFormModal,
    AuditoriaDeleteModal,
  ],
  templateUrl: './auditorias.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Auditorias implements OnInit {
  private auditoriasService = inject(AuditoriasService);

  readonly searchTerm = signal<string>('');
  readonly isFormOpen = signal<boolean>(false);
  readonly isDeleteOpen = signal<boolean>(false);
  readonly selectedAuditoriaForEdit = signal<Audit | null>(null);
  readonly selectedAuditoriaForDelete = signal<Audit | null>(null);

  ngOnInit(): void {
    this.auditoriasService.loadAuditorias().subscribe({
      error: (err) => console.error('Error al inicializar auditorías:', err),
    });
  }

  onSearch(termino: string): void {
    this.searchTerm.set(termino);
  }

  onOpenFilters(): void {
    console.log('Abriendo filtros de auditorías...');
  }

  onOpenCreateModal(): void {
    this.selectedAuditoriaForEdit.set(null);
    this.isFormOpen.set(true);
  }

  onEditAuditoria(auditoria: Audit): void {
    this.selectedAuditoriaForEdit.set(auditoria);
    this.isFormOpen.set(true);
  }

  onDeleteAuditoria(auditoria: Audit): void {
    this.selectedAuditoriaForDelete.set(auditoria);
    this.isDeleteOpen.set(true);
  }

  onCloseFormModal(): void {
    this.isFormOpen.set(false);
    this.selectedAuditoriaForEdit.set(null);
  }

  onCloseDeleteModal(): void {
    this.isDeleteOpen.set(false);
    this.selectedAuditoriaForDelete.set(null);
  }

  onSaveAuditoria(event: AuditFormSubmitEvent): void {
    if (event.id) {
      this.auditoriasService.updateAuditoria(event.id, event.data).subscribe({
        next: () => this.onCloseFormModal(),
      });
    } else {
      this.auditoriasService.createAuditoria(event.data as CreateAuditDto).subscribe({
        next: () => this.onCloseFormModal(),
      });
    }
  }

  onConfirmDelete(id: string): void {
    this.auditoriasService.deleteAuditoria(id).subscribe({
      next: () => this.onCloseDeleteModal(),
    });
  }
}