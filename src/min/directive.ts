import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { minValue } from './';

const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator),
  multi: true
};

@Directive({
  selector: '[minValue][formControlName],[minValue][formControl],[minValue][ngModel]',
  providers: [MIN_VALIDATOR]
})
export class MinValidator implements Validator, OnInit, OnChanges {
  @Input() minValue: number;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = minValue(this.minValue);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let key in changes) {
      if (key === 'minValue') {
        this.validator = minValue(changes[key].currentValue);
        if (this.onChange) this.onChange();
      }
    }
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return this.validator(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
