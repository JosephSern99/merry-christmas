import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { CustomerInformation } from 'src/app/core/models/planner-note/planner-note.model';
import { InternalNotesService } from 'src/app/core/services/api/internal-notes.service';
import { ListingPopupEditComponent } from 'src/app/pages/admin/listing-popup/base-edit/base-edit.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {EndorseStatusType} from '../../../../core/constants/planner-note.constants';

@Component({
    selector: 'app-notifications-create',
    templateUrl: './notifications-create.component.html',
    styleUrls: ['./notifications-create.component.scss'],
    standalone: false
})
export class NotificationsCreateComponent extends ListingPopupEditComponent {

    allAssignableCustomers: CustomerInformation[] = [];
    customerList: CustomerInformation[] = [];
    customerMultiControl = new UntypedFormControl([]);
    customerMultiFilterCtrl: UntypedFormControl = new UntypedFormControl('');
    customerName: string;
    editForm: UntypedFormGroup;
    filteredCustomerMulti: ReplaySubject<CustomerInformation[]> = new ReplaySubject<CustomerInformation[]>(1);
    selectedCustomers: CustomerInformation[] = [];
    showFormError = false;

    constructor(
        protected apiService: InternalNotesService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected formBuilder: UntypedFormBuilder,
        protected popupService: PopupService,
        protected location: Location,
        private blockUIService: BlockUiService,
    ) {
        super(apiService, activatedRoute, router, formBuilder, popupService, location);
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.required]],
        });
    }

    onSubmit(): void {
        throw new Error('Method not implemented.');
    }

    protected readonly EndorseStatusType = EndorseStatusType;

    isEndorsedCustomer(customerId: string): boolean {
        return this.getEndorsedCustomers().map(customer => customer.id).includes(customerId);
    }

    getEndorsedCustomers(): CustomerInformation[] {
        return this.allAssignableCustomers.filter(customer => customer.status === EndorseStatusType.Endorsed);
    }

    removeCustomer(i) {
        this.selectedCustomers = this.selectedCustomers.filter((customer, idx) => idx !== i);
        this.customerMultiControl.patchValue(this.customerMultiControl.value.filter((customer, idx) => idx !== i));
    }

    updateSelection(isOpen: boolean): void {
        // Your selection update logic
        console.log('Selection updated:', isOpen);
    }
}
