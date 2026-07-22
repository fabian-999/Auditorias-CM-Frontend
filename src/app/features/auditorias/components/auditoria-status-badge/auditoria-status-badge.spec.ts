import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaStatusBadge } from './auditoria-status-badge';

describe('AuditoriaStatusBadge', () => {
  let component: AuditoriaStatusBadge;
  let fixture: ComponentFixture<AuditoriaStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriaStatusBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriaStatusBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
