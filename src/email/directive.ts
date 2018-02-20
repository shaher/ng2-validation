/*
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { email } from './index';

const EMAIL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmailValidator),
  multi: true
};

@Directive({
  selector: '[emailValidator][formControlName],[emailValidator][formControl],[emailValidator][ngModel]',
  providers: [EMAIL_VALIDATOR]
})
export class EmailValidator implements Validator {
  validate(c: AbstractControl): { [key: string]: any } {
    return email(c);
  }
}
*/
