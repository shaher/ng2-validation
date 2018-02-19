import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
// import { isValidNumber, CountryCode, TelephoneNumber, getNumberType } from 'libphonenumber-js';
// google-libphonenumber
// Require `PhoneNumberFormat`.
const PNF = require('google-libphonenumber').PhoneNumberFormat;

// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

// Parse number with country code and keep raw input.

import { isPresent } from '../util/lang';
import { PhoneNumberTypes } from '.';

export const phone = (country: string, phoneNumberType: PhoneNumberTypes): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } => {
    if (isPresent(Validators.required(control))) return null;

    let isValid = false;
    let v = control.value;
    try {
      var number = phoneUtil.parse(v, country);
      let isValidNumber = phoneUtil.isValidNumber(number);
      let numberType = phoneUtil.getNumberType(number) as PhoneNumberTypes;
      let region = phoneUtil.getRegionCodeForNumber(number);
      isValid = isValidNumber && (!phoneNumberType || phoneNumberType == numberType || phoneNumberType == PhoneNumberTypes.FIXED_LINE_OR_MOBILE);
      // let isValid =  isValidNumber(v as TelephoneNumber, country as CountryCode)
      // let a = getNumberType(v as TelephoneNumber, country as CountryCode);
      // console.log('number: ( ' + v + ' ) ' + ', valid: (' + isValid + ' )' + ', type: (' + numberType + ' )' + ', region: (' + region + ' )');
    } catch (e) {

    }
    return isValid ? null : { phone: true };
  };
};
