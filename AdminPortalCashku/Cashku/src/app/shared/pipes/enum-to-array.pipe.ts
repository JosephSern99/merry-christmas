import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
    transform(data: Object, isString?: boolean, shouldPrepend = true) {
        let keys: any[] = [];

        for (var enumMember in data) {
            if (!isNaN(parseInt(enumMember, 10))) {
                const label = shouldPrepend ? this.prependSpaceBeforeCapital(data[enumMember]) : data[enumMember];
                keys.push({ value: parseInt(enumMember), label: label });
            }
            else {
                if (isString)
                    keys.push({ value: enumMember, label: this.prependSpaceBeforeCapital(data[enumMember]) });
            }
        }

        return keys;
    }

    private prependSpaceBeforeCapital(label: string) {
        return label.replace(/([A-Z])/g, ' $1').trim();
    }
}
