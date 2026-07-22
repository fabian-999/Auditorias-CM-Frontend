import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriasTable } from './auditorias-table';

describe('AuditoriasTable', () => {
  let component: AuditoriasTable;
  let fixture: ComponentFixture<AuditoriasTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriasTable],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriasTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
