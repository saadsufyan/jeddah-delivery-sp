import { TestBed } from '@angular/core/testing';

import { GeneralApiService } from './general-api.service';

describe('GeneralApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralApiService = TestBed.get(GeneralApiService);
    expect(service).toBeTruthy();
  });
});
