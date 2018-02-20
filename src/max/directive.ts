import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { maxValue } from './';

const MAX_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator),
  multi: true
};

@Directive({
  selector: '[maxValue][formControlName],[maxValue][formControl],[maxValue][ngModel]',
  providers: [MAX_VALIDATOR]
})
export class MaxValidator implements Validator, OnInit, OnChanges {
  @Input() maxValue: number;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = maxValue(this.maxValue);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let key in changes) {
      if (key === 'maxValue') {
        this.validator = maxValue(changes[key].currentValue);
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
