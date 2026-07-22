import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaFormModal } from './auditoria-form-modal';

describe('AuditoriaFormModal', () => {
  let component: AuditoriaFormModal;
  let fixture: ComponentFixture<AuditoriaFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriaFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriaFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
