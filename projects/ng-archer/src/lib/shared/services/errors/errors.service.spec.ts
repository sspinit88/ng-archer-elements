import { TestBed } from '@angular/core/testing';

import { ErrorsService } from './errors.service';

describe('ErrorsService', () => {
  let service: ErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsService);
  });

  it('should throw error', () => {
    const testObj: unknown = null;
    const errorMsg: string = 'error error error error';

    expect(() => {
      service.checkAndThrowError(testObj, errorMsg);
    }).toThrowError(errorMsg);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
