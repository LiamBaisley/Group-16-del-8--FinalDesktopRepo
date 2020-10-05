import { TestBed } from '@angular/core/testing';

import { DutyServiceService } from './duty-service.service';

describe('DutyServiceService', () => {
  let service: DutyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DutyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
