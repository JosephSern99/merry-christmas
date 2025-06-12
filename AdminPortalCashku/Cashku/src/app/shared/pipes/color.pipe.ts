import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'chartColor',
    standalone: false
})
export class ColorPipe implements PipeTransform {

    transform(index: number): any {
        switch (index) {
            case 0: return  '#538AD5';
            case 1: return  '#82C4BC';
            case 3: return  '#82C484';
            case 4: return  '#0F7763';
            case 5: return  '#EFD56A';
            case 6: return  '#06CBCB';
            case 7: return  '#FF9D2A';
            case 8: return  '#FF8D8D';
            case 9: return  '#BA86C1';
            case 10: return '#FF6CF4';
            case 11: return '#C48282';
            case 12: return '#FF0000';
            case 13: return '#9D2AFF';
            case 14: return '#C6940D';
            case 15: return '#A03724';
            case 16: return '#A3A3A3';
            case 17: return '#6FEF6A';
            case 18: return '#5A565A';
            case 19: return '#86A4C1';
            case 20: return '#777E51';
            default: return 'black';
        }
    }
}
