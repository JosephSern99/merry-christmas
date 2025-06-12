import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PATTERN =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export function EmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isValidFormat = PATTERN.test(control.value);
        return isValidFormat
            ? null
            : { invalidEmail: { value: control.value } };
    };
}
