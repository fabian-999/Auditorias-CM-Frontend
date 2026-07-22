import { TestBed } from '@angular/core/testing';

import { Auditorias } from './auditorias';

describe('Auditorias', () => {
  let service: Auditorias;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auditorias);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
