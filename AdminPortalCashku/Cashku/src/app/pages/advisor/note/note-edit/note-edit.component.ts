import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, finalize, take, takeUntil } from 'rxjs/operators';
import { EndorseStatusType, PlannerNoteStatus } from 'src/app/core/constants/planner-note.constants';
import { CustomerListModel } from 'src/app/core/models/customer/customer.model';
import { CustomerInformation, PlannerNoteCreate } from 'src/app/core/models/planner-note/planner-note.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { NoteDetailComponent } from 'src/app/pages/advisor/note/note-detail/note-detail.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupOptions } from 'src/app/shared/services/popup/popup-options';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {PlannerNoteBreadcrumbComponent} from '../../../admin/planner-notes/planner-note-breadcrumb/planner-note-breadcrumb.component';

@Component({
    selector: 'app-note-edit',
    templateUrl: './note-edit.component.html',
    styleUrls: ['./note-edit.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        NgxMatSelectSearchModule,
        PlannerNoteBreadcrumbComponent
    ]
})
export abstract class NoteEditComponent extends NoteDetailComponent implements OnDestroy, AfterViewInit {

    assignableCustomer = [];
    editForm!: UntypedFormGroup;
    EndorseStatusType = EndorseStatusType;
    isAddOperation = false;
    operationLabel = 'Edit';
    showFormError = false;

    // Multi selection search dropdown variables.
    @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
    customerList: CustomerInformation[] = [];
    customerMultiControl = new UntypedFormControl([]);
    customerMultiFilterCtrl: UntypedFormControl = new UntypedFormControl('');
    isSearching = false;
    selectedCustomers: CustomerInformation[] = [];
    private filteredCustomerMulti: ReplaySubject<CustomerInformation[]> = new ReplaySubject<CustomerInformation[]>(1);
    // Multi selection search dropdown variables.

    protected advisorID = '';
    protected readonly noteType: string = 'Planner';
    protected isChangesSaved = false;

    private onDestroy = new Subject<void>();

    constructor(
        protected apiService: BaseApiService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected breadcrumbService: BaseApiService,
        protected popupService: PopupService,
        protected formBuilder: UntypedFormBuilder,
        protected blockUIService: BlockUiService,
        protected location: Location,
    ) {
        super(apiService, activatedRoute, router, breadcrumbService, popupService);
    }

    ngOnInit(): void {
        this.getOperation();
        this.setupEditForm();

        if (this.isAddOperation) {
            return;
        }

        super.ngOnInit();

        this.customerMultiFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe(
            () => {
                this.filterCustomerMulti();
            }
        );
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    ngAfterViewInit(): void {
        this.setInitialValue();
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.editForm) {
            return true;
        }

        if (this.editForm.dirty === false) {
            return true;
        }

        if (this.isChangesSaved) {
            return true;
        }

        return this.popupService.confirm("Changes have not been saved.\nDo you wish to proceed?", {
            okLabel: 'Leave',
            cancelLabel: 'Cancel',
        } as PopupOptions)
            .then(
                () => true,
                () => {
                    const currentUrl = this.router.url;
                    if (this.location.isCurrentPathEqualTo(currentUrl)) {
                      // https://github.com/angular/angular/issues/13586
                      this.router.navigate([currentUrl], { skipLocationChange: true });
                    } else {
                      // manually add browser history back.
                      history.pushState(null, null, location.href);
                    }
                    return false;
                }
            );
    };

    getListDetailRoute(id: string | number): any[] {
        return [];
    }

    isEndorsedCustomer(customerID: string): boolean {
        return this.getEndorsedCustomers().map(customer => customer.id).includes(customerID);
    }

    isEndorsedNote(): boolean {
        return false;
    }

    onSubmit(isDraft = false): void {
        if (this.editForm.invalid || !this.isInputFieldsValid()) {
            this.showFormError = true;
            return;
        }

        let data = this.formatData();
        let popupMessage = '';
        data.status = PlannerNoteStatus.published;
        popupMessage = `Success! ${this.noteType} note has been ${this.isAddOperation ? 'created' : 'updated'}`;

        if (isDraft) {
            data.status = PlannerNoteStatus.drafted;
            popupMessage =`Success! ${this.noteType} note saved as draft.`;
        }

        this.handleDataSubmission(data, popupMessage);
    }

    removeCustomer(i) {
        this.selectedCustomers = this.selectedCustomers.filter((customer, idx) => idx !== i);
        this.customerMultiControl.patchValue(this.customerMultiControl.value.filter((customer, idx) => idx !== i));
    }

    updateSelection(isOpen: boolean): void {
        if (isOpen) return;

        if (!this.customerMultiControl.value) {
            return;
        }

        const allCustomersOptionSelected = !!this.customerMultiControl.value.find(selection => selection == 'all');
        if (allCustomersOptionSelected) {
            this.selectedCustomers = this.getEndorsedCustomers();
            this.assignableCustomer.forEach(customer => this.handleSelectedCustomers(customer.id));
            this.customerMultiControl.patchValue(this.selectedCustomers.map(customer => customer.id));
            return;
        }

        this.selectedCustomers = this.getEndorsedCustomers();
        this.customerMultiControl.value.forEach(newCustomerId => this.handleSelectedCustomers(newCustomerId));
    }

    protected fillDataToEditForm(): void {
        this.editForm.patchValue(this.detail);
        if (this.detail.customerInformation) {
            this.detail.customerInformation.forEach(customer => this.selectedCustomers.push(customer));
            this.customerMultiControl.patchValue(this.detail.customerInformation.map(customer => customer.id));
        }
    }

    protected getAssignableCustomers(): void {
        let customerInformation = this.detail.customerInformation ?? [];

        this.getSearchCustomerApi('').subscribe(
            (customers) => {
                if (customers.length === 0) {
                    this.popupService.alert(`There are no customers assigned to this advisor.`);
                    return this.router.navigate(['..'], { relativeTo: this.activatedRoute });
                }

                this.assignableCustomer = customers.map(
                    (customer) => ({
                        ...customer,
                        status: this.handleCustomerStatus(customer.id, customerInformation)
                    })
                );
                this.customerList = customers;
            }
        );
    }

    protected getAdvisorID(): string {
        return this.detail.advisorId;
    }

    protected getDeleteNoteApi(): Observable<any> {
        return of();
    }

    protected getOperation(): void {
        this.isAddOperation = (typeof this.activatedRoute.snapshot.data['isAdd'] === 'boolean') ? this.activatedRoute.snapshot.data['isAdd'] : false;
        this.operationLabel = this.isAddOperation ? 'Create' : 'Edit';
    }

    protected handleDataSubmission(data: PlannerNoteCreate, popupMessage: string): void {
        this.blockUIService.open();

        const observable = this.isAddOperation ? this.getCreateApi(data) : this.getEditApi(data);
        observable.pipe(finalize(() => this.blockUIService.close())).subscribe(
            data => {
                this.isChangesSaved = true;
                this.popupService.alert(popupMessage).then(
                    () => {
                        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
                        this.isRefresh = true;
                    }
                );
            })
    }

    protected handleSuccessResponse(response: any) {
        super.handleSuccessResponse(response);

        this.fillDataToEditForm();
        this.advisorID = this.getAdvisorID();
        this.getAssignableCustomers();
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
        this.getSearchCustomerApi(search).pipe(finalize(() => this.isSearching = false)).subscribe(
            (customers) => {
                this.customerList = customers;
            }
        );
    }

    private formatData(): PlannerNoteCreate {
        let data: PlannerNoteCreate = this.editForm.value;
        data.customerList = this.selectedCustomers.filter(customer => !this.isEndorsedCustomer(customer.id)).map(customer => customer.id);

        return data;
    }

    private getEndorsedCustomers(): CustomerInformation[] {
        return this.assignableCustomer.filter(customer => customer.status === EndorseStatusType.Endorsed);
    }

    private handleCustomerStatus(id: string, assignedCustomers: CustomerInformation[]): EndorseStatusType {
        const isCustomerFound = assignedCustomers.find(customer => customer.id === id);
        return isCustomerFound? isCustomerFound.status : EndorseStatusType['Not Endorsed'];
    }

    private handleSelectedCustomers(id: string) {
        if (!this.isEndorsedCustomer(id)) {
            this.selectedCustomers.push(this.assignableCustomer.find(customer => customer.id === id));
        }
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

    private setInitialValue(): void {
        this.filteredCustomerMulti.pipe(take(1), takeUntil(this.onDestroy)).subscribe(
            () => {
                if (this.multiSelect)
                    this.multiSelect.compareWith = (a: CustomerListModel, b: CustomerListModel) => a && b && a.id === b.id;
            }
        );
    }

    protected abstract getCreateApi(data: PlannerNoteCreate): Observable<boolean>;
    protected abstract getEditApi(data: PlannerNoteCreate): Observable<boolean>;
    protected abstract getSearchCustomerApi(searchKey: string): Observable<CustomerInformation[]>;
    protected abstract setupEditForm(): void;

}
