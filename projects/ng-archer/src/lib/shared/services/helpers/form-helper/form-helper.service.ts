import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BooleanFormProperty } from '../../../enums/form/from-property.enum';
import { PropertyCheckResult } from '../../../models/common/property-check-result.model';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor() {
  }

  // FIXME тестировать
  getPropertyBooleanValue(control: FormControl, property: keyof typeof BooleanFormProperty): PropertyCheckResult {
    return {
      exist: (!!control && (property in control)),
      value: (!!control && (property in control)) ? control[property] : false,
    };
  }

}
