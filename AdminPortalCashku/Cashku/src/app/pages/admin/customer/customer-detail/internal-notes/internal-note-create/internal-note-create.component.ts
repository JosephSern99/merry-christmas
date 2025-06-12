import { ActivatedRoute, Router } from '@angular/router';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { Component, ViewChild } from '@angular/core';
import { CustomerDetailModel, CustomerListModel } from 'src/app/core/models/customer/customer.model';
import { CustomerInformation, PlannerNoteCreate, PlannerNoteDetailModel } from 'src/app/core/models/planner-note/planner-note.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { debounceTime, finalize, take, takeUntil } from 'rxjs/operators';
import { EndorseStatusType, PlannerNoteStatus } from 'src/app/core/constants/planner-note.constants';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ListingPopupEditComponent } from 'src/app/pages/admin/listing-popup/base-edit/base-edit.component';
import { Location } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { ReplaySubject, Subject } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { UiPaginationModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { InternalNotesService } from 'src/app/core/services/api/internal-notes.service';

@Component({
    selector: 'app-internal-note-create',
    templateUrl: './internal-note-create.component.html',
    styleUrls: ['./internal-note-create.component.scss'],
    standalone: false
})
export class InternalNoteCreateComponent extends ListingPopupEditComponent {

    private advisorId: string = this.storageService.userId;
    allAssignableCustomers: CustomerInformation[] = [];
    customerDetail: CustomerDetailModel;
    customerList: CustomerInformation[] = [];
    customerMultiControl = new UntypedFormControl([]);
    customerMultiFilterCtrl: UntypedFormControl = new UntypedFormControl('');
    customerName: string;
    detail: any;
    editForm: UntypedFormGroup;
    EndorseStatusType = EndorseStatusType;
    filteredCustomerMulti: ReplaySubject<CustomerInformation[]> = new ReplaySubject<CustomerInformation[]>(1);
    isSearching = false;
    isSingleCustomer: boolean;
    pagination: UiPaginationModel = new UiPaginationModel();
    selectedCustomers: CustomerInformation[] = [];
    showFormError = false;
    readonly templateForRole: string = 'advisor';
    protected id: string | number;

    private _onDestroy = new Subject<void>();

    @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

    constructor(
        protected apiService: InternalNotesService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected formBuilder: UntypedFormBuilder,
        protected popupService: PopupService,
        protected location: Location,
        private blockUIService: BlockUiService,
        private customerService: CustomerService,
        private storageService: StorageService
    ) {
        super(apiService, activatedRoute, router, formBuilder, popupService, location);
    }

    ngOnInit(): void {

        this.isSingleCustomer = (typeof this.activatedRoute.snapshot.data['isSingle'] === 'boolean') ? this.activatedRoute.snapshot.data['isSingle'] : false;

        if (this.isSingleCustomer === true) {
            this.getIDFromUrlParam();
            this.getCustomerDetail();
        }
        super.ngOnInit();


        this.customerMultiFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy), debounceTime(500))
            .subscribe((search: any) => {
                this.filterCustomerMulti();
            });
    }

    getCustomerDetail(): void {
        this.customerService.getDetail(this.id).subscribe(
            (success: any) => { this.customerDetail = success; },
            (err) => { this.handleErrorResponse(err); }
        );
    }

    ngAfterViewInit(): void {
        this.setInitialValue();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.required]],
        });
    }

    protected fillDataToEditForm(): void {
        super.fillDataToEditForm();

        this.editForm.patchValue(this.detail);
        if (this.detail.customerInformation) {
            this.detail.customerInformation.forEach(customer => this.selectedCustomers.push(customer));
            this.customerMultiControl.patchValue(this.detail.customerInformation.map(customer => customer.id));
        }
    }

    isEndorsedCustomer(customerId: string): boolean {
        return this.getEndorsedCustomers().map(customer => customer.id).includes(customerId);
    }

    getEndorsedCustomers(): CustomerInformation[] {
        return this.allAssignableCustomers.filter(customer => customer.status === EndorseStatusType.Endorsed);
    }

    updateSelection(isOpen: boolean) {
        if (isOpen) return;

        if (!this.customerMultiControl.value) {
            return;
        }

        const allCustomersOptionSelected = !!this.customerMultiControl.value.find(selection => selection === 'all');
        if (allCustomersOptionSelected) {
            this.selectedCustomers = this.getEndorsedCustomers();
            this.allAssignableCustomers.forEach(customer => this.handleSelectedCustomers(customer.id));
            this.customerMultiControl.patchValue(this.selectedCustomers.map(customer => customer.id));
            return;
        }

        this.selectedCustomers = this.getEndorsedCustomers();
        this.customerMultiControl.value.forEach(newCustomerId => this.handleSelectedCustomers(newCustomerId));
    }

    private handleSelectedCustomers(id: string) {
        if (!this.isEndorsedCustomer(id)) {
            this.selectedCustomers.push(this.allAssignableCustomers.find(customer => customer.id === id));
        }
    }

    removeCustomer(i) {
        this.selectedCustomers = this.selectedCustomers.filter((customer, idx) => idx !== i);
        this.customerMultiControl.patchValue(this.customerMultiControl.value.filter((customer, idx) => idx !== i));
    }


    private filterCustomerMulti(): void {
        if (!this.customerList) {
            return;
        }

        let search = this.customerMultiFilterCtrl.value;

        if (!search) {
            this.filteredCustomerMulti.next(this.customerList.slice());
        } else {
            search = search.toLowerCase();
        }

        this.isSearching = true;
        this.apiService.searchCustomers(this.advisorId, search)
            .pipe(finalize(() => this.isSearching = false))
            .subscribe((customers) => {
                this.customerList = customers;
            });
    }

    private setInitialValue(): void {
        this.filteredCustomerMulti
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(() => {
                if (this.multiSelect)
                    this.multiSelect.compareWith = (a: CustomerListModel, b: CustomerListModel) => a && b && a.id === b.id;
            });
    }

    onSubmit(isDraft = false): void {
        if (this.editForm.invalid || !this.isInputFieldsValid()) {
            this.showFormError = true;
            return
        }

        this.blockUIService.open();

        const data = this.formatData();
        var popupMessage = '';
        if (isDraft) {
            data.status = PlannerNoteStatus.drafted;
            popupMessage = 'Success! Internal note saved as draft.';
        } else {
            data.status = PlannerNoteStatus.published;
            popupMessage = `Success! Internal note has been ${this.isAddOperation ? 'created' : 'updated'}`;
        }

        this.handleDataSubmission(data, popupMessage);
    }

    private formatData(): PlannerNoteCreate {
        let data: PlannerNoteCreate = this.editForm.value;

        if (this.isSingleCustomer) {
            data.customerList = [this.customerDetail.id];
        } else {
            data.customerList = this.selectedCustomers.filter(customer => !this.isEndorsedCustomer(customer.id)).map(customer => customer.id);
        }

        return data;
    }

    private handleDataSubmission(data: PlannerNoteCreate, popupMessage: string): void {
        const observable = this.isAddOperation
            ? this.apiService.createInternalNotes(data)
            : this.apiService.updateInternalNotes(data, this.id);

        observable.pipe(finalize(() => this.blockUIService.close()))
            .subscribe(data => {
                this.isChangesSaved = true;
                this.popupService.alert(popupMessage)
                    .then(() => {
                        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
                        this.isRefresh = true;
                    });
            })
    }



    private isInputFieldsValid(): boolean {
        let isValid = true;
        for (const control in this.editForm.controls) {
            const formControl = this.editForm.controls[control];
            if (formControl.value.trim() === '') {
                formControl.patchValue('');
                isValid = false;
            }
        }
        if (!isValid) {
            this.popupService.alert('Title and/or description cannot be empty.');
        }

        return isValid;
    }

    private handleCustomerStatus(id: string, assignedCustomers: CustomerInformation[]): EndorseStatusType {
        const isCustomerFound = assignedCustomers.find(customer => customer.id === id);
        return isCustomerFound? isCustomerFound.status : EndorseStatusType['Not Endorsed'];
    }

    getBreadcrumbs() {
        return  [
            { path: '/admin-planner-notes/detail/' + this.id, title: 'Note Detail'},
            { path: '', title: 'Edit Note'},
        ];
    }
}
