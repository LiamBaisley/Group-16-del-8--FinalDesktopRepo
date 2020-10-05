import { TestBed } from '@angular/core/testing';

import { DoctypeService } from './doctype.service';

describe('DoctypeService', () => {
  let service: DoctypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
