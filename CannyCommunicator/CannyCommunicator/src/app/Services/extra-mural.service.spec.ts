import { TestBed } from '@angular/core/testing';

import { ExtraMuralService } from './extra-mural.service';

describe('ExtraMuralService', () => {
  let service: ExtraMuralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraMuralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
