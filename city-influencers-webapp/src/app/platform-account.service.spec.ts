import { TestBed } from '@angular/core/testing';

import { PlatformAccountService } from './platform-account.service';

describe('PlatformAccountService', () => {
  let service: PlatformAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
