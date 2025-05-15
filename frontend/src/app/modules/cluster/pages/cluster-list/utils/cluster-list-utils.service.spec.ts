import { TestBed } from '@angular/core/testing';

import { ClusterListUtilsService } from './cluster-list-utils.service';

describe('ClusterListUtilsService', () => {
  let service: ClusterListUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClusterListUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
