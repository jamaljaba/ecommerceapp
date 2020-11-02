import { TestBed } from '@angular/core/testing';

import { GlobalitemsService } from './globalitems.service';

describe('GlobalitemsService', () => {
  let service: GlobalitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
