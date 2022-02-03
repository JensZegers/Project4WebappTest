import { TestBed } from '@angular/core/testing';

import { CityUserService } from './city-user.service';

describe('CityUserService', () => {
  let service: CityUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
