import { TestBed } from '@angular/core/testing';

import { SendMessageGuard } from './send-message.guard';

describe('SendMessageGuard', () => {
  let guard: SendMessageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SendMessageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
