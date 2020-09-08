import { TestBed } from '@angular/core/testing';

import { DatafeedsService } from './datafeeds.service';

describe('DatafeedsService', () => {
  let service: DatafeedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatafeedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
