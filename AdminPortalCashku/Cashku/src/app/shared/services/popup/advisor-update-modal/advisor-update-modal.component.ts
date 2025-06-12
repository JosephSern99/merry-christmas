import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { AssignableAdvisorModel } from 'src/app/core/models/advisor/advisor.model';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { PopupService } from '../popup.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectSearchComponent} from 'ngx-mat-select-search';

@Component({
    selector: 'app-advisor-update-modal',
    templateUrl: './advisor-update-modal.component.html',
    styleUrls: ['./advisor-update-modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatProgressBarModule,
        MatSelectSearchComponent,
        // Add necessary Angular Material modules here, e.g., MatSelectModule, MatInputModule, etc.
    ]
})
export class AdvisorUpdateModalComponent implements OnInit {
    advisorControl = new UntypedFormControl();
    custId: string = '';
    editForm: UntypedFormGroup;
    filteredAdvisors: AssignableAdvisorModel[] = [];
    isLoadingAdvisors = false;
    searchControl = new UntypedFormControl();
    showFormError: boolean = false;
    uiAdvisor: { fullName: string; id: string };

    constructor(
        public activeModal: NgbActiveModal,
        protected apiAdvisorService: AdvisorService,
        protected apiCustomerService: CustomerService,
        protected formBuilder: UntypedFormBuilder,
        private popupService: PopupService,
    ) { }

    ngOnInit(): void {
        this.editForm = this.formBuilder.group({
            advisor: ['', Validators.required],
        })

        this.searchControl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(value => {
            this.isLoadingAdvisors = true;
            value ? this.filterAdvisors(value) : this.filterAdvisors();
        });
    }

    get formattedAdvisor(): string {
        let advisor: string;
        advisor = 'Search Advisor';
        if (this.uiAdvisor && (this.uiAdvisor.fullName && this.uiAdvisor.id)) {
            advisor = `${this.uiAdvisor.fullName} (${this.uiAdvisor.id})`;
        }
        return advisor;
    }

    setSelection(selection: MatSelectChange): void {
        this.editForm.get('advisor').setValue(selection.value.id);
        this.uiAdvisor = {id: selection.value.id, fullName: selection.value.fullName};
    }

    private filterAdvisors(value = ''): void {
        let filter = new ListingFilterModel();
        filter.keywordsField = 'FullName';
        filter.keywords = value.toLowerCase();
        filter.currentPage = 0;
        this.apiAdvisorService.getAssignableAdvisors(filter).pipe(map(data => data.data))
            .subscribe(advisors => {
                this.filteredAdvisors = advisors;
                this.isLoadingAdvisors = false;
            });
    }

    onSubmit(): void {
        if (this.editForm.invalid) {
            this.showFormError = true;
            return
        }

        this.showFormError = false;

        this.apiCustomerService.assignCustomerWithAdvisor(this.uiAdvisor.id, this.custId)
            .subscribe(() => {
                this.popupService.alert('Updated Successfully.');
            })
            .add(() => {
                this.activeModal.dismiss();
            });
    }
}
