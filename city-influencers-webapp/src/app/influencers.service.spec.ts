import { TestBed } from '@angular/core/testing';

import { InfluencersService } from './admin.service';

describe('InfluencersService', () => {
  let service: InfluencersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfluencersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
