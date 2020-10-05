import { TestBed } from '@angular/core/testing';

import { PRTypeService } from './prtype.service';

describe('PRTypeService', () => {
  let service: PRTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PRTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
