import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriasToolbar } from './auditorias-toolbar';

describe('AuditoriasToolbar', () => {
  let component: AuditoriasToolbar;
  let fixture: ComponentFixture<AuditoriasToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriasToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriasToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
