import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaDeleteModal } from './auditoria-delete-modal';

describe('AuditoriaDeleteModal', () => {
  let component: AuditoriaDeleteModal;
  let fixture: ComponentFixture<AuditoriaDeleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriaDeleteModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriaDeleteModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
