import { TestBed } from '@angular/core/testing';

import { SpinnerNgxAdapterService } from './spinner-ngx-adapter.service';

describe('SpinnerService', () => {
  let service: SpinnerNgxAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerNgxAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
