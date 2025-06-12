import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberSuffix',
    standalone: false
})
export class NumberSuffixPipe implements PipeTransform {
    transform(input: any, args: number = 2): string {
        if (isNaN(input) || input == 0) {
            return input;
        }
        const suffixes = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
        const exp = Math.floor(Math.log(Math.abs(input)) / Math.log(1000)); // 1, 2, 3, ...
        return ((Math.abs(input) / Math.pow(1000, exp) * Math.sign(input))).toFixed(args) + suffixes[exp];
    }
}
