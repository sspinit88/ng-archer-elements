import { ErrorService } from './error.service';
import { TestBed } from '@angular/core/testing';
import { OTHERS_ERROR } from '../../messages/error-message.constants';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it(`should throw Error: ${OTHERS_ERROR.elementIsMissing}`, () => {
    const data: null = null;
    const message: string = OTHERS_ERROR.elementIsMissing;

    expect(() => {
      service.checkAndThrowError(data, message);
    }).toThrow(new Error(OTHERS_ERROR.elementIsMissing));
  });

});
