import { TestBed } from '@angular/core/testing';

import { GoalsService } from './goals.service';

describe('GoalsService', () => {
  let service: GoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
