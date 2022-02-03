import { TestBed } from '@angular/core/testing';

import { InfluencersListService } from './influencers.service';

describe('InfluencersListService', () => {
  let service: InfluencersListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfluencersListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
