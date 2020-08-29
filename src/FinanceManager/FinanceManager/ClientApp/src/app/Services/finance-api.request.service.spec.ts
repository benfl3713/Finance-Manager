import { TestBed } from '@angular/core/testing';

import { FinanceApi.RequestService } from './finance-api.request.service';

describe('FinanceApi.RequestService', () => {
  let service: FinanceApi.RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceApi.RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
