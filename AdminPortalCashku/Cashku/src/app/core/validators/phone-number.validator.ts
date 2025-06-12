import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { CountryCode, RegionCode } from 'src/app/core/constants/user.constants';

export function PhoneNumberValidator(countryCode: CountryCode = CountryCode['Malaysia (+60)']): ValidatorFn {
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    return (control: AbstractControl): { [key: string]: boolean } => {
        let validNumber = false;
        try {
            const parsedPhoneUtil = phoneNumberUtil.parse(
                control.value.toString(),
                RegionCode[countryCode]
            );
            validNumber = phoneNumberUtil.isValidNumberForRegion(
                parsedPhoneUtil,
                RegionCode[countryCode]
            );
        } catch (e) {}

        return validNumber ? null : { incorrectFormat: true };
    };
}
