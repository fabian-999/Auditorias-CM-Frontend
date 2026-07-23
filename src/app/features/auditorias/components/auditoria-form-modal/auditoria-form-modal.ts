import { Component, ChangeDetectionStrategy, input, output, inject, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Audit, AuditStatus, CreateAuditDto, UpdateAuditDto } from '../../models/auditoria.model';

export interface AuditFormSubmitEvent {
  id?: string;
  data: CreateAuditDto | UpdateAuditDto;
}

@Component({
  selector: 'app-auditoria-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auditoria-form-modal.html',
  styleUrl: './auditoria-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriaFormModal {
  private fb = inject(FormBuilder);

  readonly isOpen = input<boolean>(false);
  readonly auditoriaToEdit = input<Audit | null>(null);

  readonly close = output<void>();
  readonly save = output<AuditFormSubmitEvent>();

  readonly form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    status: ['open' as AuditStatus, [Validators.required]],
    punto: [''],
    process: [''],
    objective: [''],
    scope: [''],
    criteria: [''],
    start_date: [''],
    end_date: [''],
    lead_user_id: [''],
    created_by: [''],
  });

  constructor() {
    effect(() => {
      const currentAudit = this.auditoriaToEdit();
      if (currentAudit) {
        this.form.patchValue({
          title: currentAudit.title ?? '',
          status: currentAudit.status ?? 'open',
          punto: currentAudit.punto ?? '',
          process: currentAudit.process ?? '',
          objective: currentAudit.objective ?? '',
          scope: currentAudit.scope ?? '',
          criteria: currentAudit.criteria ?? '',
          start_date: currentAudit.start_date ? currentAudit.start_date.split('T')[0] : '',
          end_date: currentAudit.end_date ? currentAudit.end_date.split('T')[0] : '',
          lead_user_id: currentAudit.lead_user_id ?? '',
          created_by: currentAudit.created_by ?? '',
        });
      } else {
        this.form.reset({
          title: '',
          status: 'open',
          punto: '',
          process: '',
          objective: '',
          scope: '',
          criteria: '',
          start_date: '',
          end_date: '',
          lead_user_id: '',
          created_by: '',
        });
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.value;
    const data: CreateAuditDto = {
      title: val.title.trim(),
      status: val.status,
      punto: val.punto ? val.punto.trim() : null,
      process: val.process ? val.process.trim() : null,
      objective: val.objective ? val.objective.trim() : null,
      scope: val.scope ? val.scope.trim() : null,
      criteria: val.criteria ? val.criteria.trim() : null,
      start_date: val.start_date ? val.start_date : null,
      end_date: val.end_date ? val.end_date : null,
      lead_user_id: val.lead_user_id ? val.lead_user_id.trim() : null,
      created_by: val.created_by ? val.created_by.trim() : null,
    };

    const editItem = this.auditoriaToEdit();
    if (editItem) {
      this.save.emit({ id: editItem.id, data });
    } else {
      this.save.emit({ data });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
