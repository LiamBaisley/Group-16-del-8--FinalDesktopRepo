import { TestBed } from '@angular/core/testing';

import { ExtraMuralCompanyServiceService } from './extra-mural-company-service.service';

describe('ExtraMuralCompanyServiceService', () => {
  let service: ExtraMuralCompanyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraMuralCompanyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
