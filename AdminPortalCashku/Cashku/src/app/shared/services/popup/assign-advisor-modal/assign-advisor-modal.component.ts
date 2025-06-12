import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject, Subject } from 'rxjs';
import { AdvisorDetailModel } from 'src/app/core/models/advisor/advisor.model';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { ListingDataInterface, ListingFilterModel, ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { environment } from 'src/environments/environment';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatSelectSearchComponent} from 'ngx-mat-select-search';
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-assign-advisor-modal',
    templateUrl: './assign-advisor-modal.component.html',
    styleUrls: ['./assign-advisor-modal.component.scss'],
    standalone: true,
    imports: [
        MatSelectTrigger,
        MatIcon,
        MatSelect,
        ReactiveFormsModule,
        MatOption,
        MatButton,
        MatCheckbox,
        MatSelectSearchComponent,
        CommonModule

    ]
})
export class AssignAdvisorModalComponent extends ListingPopupBaseComponent implements OnInit {
    advisorId: string;
    showFormError = false;
    /** list of advisors filtered by search keyword */
    filteredAdvisors: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    form = this.formBuilder.group({
        advisor: [null, Validators.required],
        default: false,
    });
    listingDataSource: AdvisorDetailModel[] = [];

    private destroy = new Subject<void>();

    constructor(
        protected apiService: AdvisorService,
        protected formBuilder: UntypedFormBuilder,
        public activeModal: NgbActiveModal,
    ) {
        super(apiService, formBuilder);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.form.controls.default.valueChanges.subscribe((isChecked) => {
            if (isChecked) {
                this.form.controls.advisor.disable();
                this.form.controls.advisor.setValue({ id: environment.defaultAdvisorId, fullName: 'Cashku Advisor' });
            } else {
                this.form.controls.advisor.enable();
                this.form.controls.advisor.reset();
            }
        })
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
    }

    onClose(): void {
        this.activeModal.dismiss();
    }

    onSubmit(): void {
        if (this.getAdvisorControl().invalid) {
            this.showFormError = true;
            return;
        }

        this.activeModal.close(this.getAdvisorControl().value);
    }

    getAdvisorFullName(): string {
        if (!this.getAdvisorControl().value) {
            return '';
        }

        return this.getAdvisorControl().value.fullName;
    }

    private getAdvisorControl(): UntypedFormControl {
        return this.form.controls.advisor as UntypedFormControl;
    }

    protected handleSuccessListingResponse(responseData: ListingResponseModel<ListingDataInterface>): void {
        super.handleSuccessListingResponse(responseData);
        this.listingDataSource = this.listingDataSource.filter((d) => d.id !== this.advisorId);
        this.filteredAdvisors.next(this.listingDataSource);
    }

    protected generateListingFilterParam(): ListingFilterModel {
        let newFilter: ListingFilterModel = super.generateListingFilterParam();
        if (newFilter.keywords.length > 0) {
            newFilter.keywordsField = 'FullName';
        }

        return newFilter;
    }
}
