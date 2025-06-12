import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
    selector: 'app-datetimepicker',
    templateUrl: './datetimepicker.component.html',
    styleUrls: ['./datetimepicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VerifierDateTimePickerComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [
        // Add necessary Angular Material modules or other dependencies here
        // For example:
        CommonModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule
    ],
})
export class VerifierDateTimePickerComponent {
    @Input() pickerType: 'calendar' | 'timer' | 'both' | 'datetime' = 'calendar';
    @Input() placeholder: string = '';
    @Input() timePlaceholder: string = '';
    @Input() minDate: Date | string | null = null;
    @Input() maxDate: Date | string | null = null;
    @Input() selectMode: string = '';

    @Output() dateTimeValueChange = new EventEmitter<any>();
    @Output() clear = new EventEmitter<void>();

    @ViewChild('datePicker') datePicker!: MatDatepicker<Date>;

    private _dateTimeValue: Date | string | null = null;
    timeValue: string = '';
    dateTimeString: string = '';

    @Input()
    get dateTimeValue(): Date | string | null {
        return this._dateTimeValue;
    }

    set dateTimeValue(value: Date | string | null) {
        this._dateTimeValue = value;
        this.updateInternalValues();
    }

    get minDateString(): string {
        if (this.minDate instanceof Date) {
            return this.minDate.toISOString().slice(0, 16);
        }
        return this.minDate as string || '';
    }

    get maxDateString(): string {
        if (this.maxDate instanceof Date) {
            return this.maxDate.toISOString().slice(0, 16);
        }
        return this.maxDate as string || '';
    }

    private updateInternalValues(): void {
        if (!this._dateTimeValue) {
            this.timeValue = '';
            this.dateTimeString = '';
            return;
        }

        if (this._dateTimeValue instanceof Date) {
            this.timeValue = this._dateTimeValue.toTimeString().slice(0, 5);
            this.dateTimeString = this._dateTimeValue.toISOString().slice(0, 16);
        } else if (typeof this._dateTimeValue === 'string') {
            const date = new Date(this._dateTimeValue);
            if (!isNaN(date.getTime())) {
                this.timeValue = date.toTimeString().slice(0, 5);
                this.dateTimeString = date.toISOString().slice(0, 16);
            }
        }
    }

    onDateChange(event: any): void {
        const selectedDate = event.value;
        this.updateDateTime(selectedDate, this.timeValue);
    }

    // Fixed: Handle Event and extract value properly
    onTimeChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (target && target.value) {
            this.timeValue = target.value;
            this.updateDateTime(this._dateTimeValue, target.value);
        }
    }

    // Fixed: Handle Event and extract value properly
    onDateTimeChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (target && target.value) {
            this.dateTimeString = target.value;
            const newDate = new Date(target.value);
            this._dateTimeValue = newDate;
            this.update(newDate);
        }
    }

    private updateDateTime(date: Date | string | null, time: string): void {
        if (!date) return;

        let finalDate: Date;

        if (date instanceof Date) {
            finalDate = new Date(date);
        } else {
            finalDate = new Date(date);
        }

        if (time && (this.pickerType === 'both' || this.pickerType === 'timer')) {
            const [hours, minutes] = time.split(':').map(Number);
            if (!isNaN(hours) && !isNaN(minutes)) {
                finalDate.setHours(hours, minutes, 0, 0);
            }
        }

        this._dateTimeValue = finalDate;
        this.update(finalDate);
    }

    update(value: any): void {
        this.dateTimeValueChange.emit(value);
    }

    clearAll(): void {
        this._dateTimeValue = null;
        this.timeValue = '';
        this.dateTimeString = '';
        this.update(null);
        this.clear.emit();
    }

    openPicker(): void {
        if (this.pickerType === 'calendar' || this.pickerType === 'both') {
            this.datePicker?.open();
        }
    }
}
