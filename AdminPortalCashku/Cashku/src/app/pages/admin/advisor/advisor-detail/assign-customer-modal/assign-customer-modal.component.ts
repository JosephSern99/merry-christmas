import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CustomerPlan, NewRegisterStep } from '../../../../../core/constants/customer.constants';
import { AssignableCustomerModel } from '../../../../../core/models/advisor/advisor.model';
import { AdvisorService } from '../../../../../core/services/api/advisor.service';
import { PopupService } from '../../../../../shared/services/popup/popup.service';

@Component({
    selector: 'app-assign-customer-modal',
    templateUrl: './assign-customer-modal.component.html',
    styleUrls: ['./assign-customer-modal.component.scss'],
    standalone: false
})
export class AssignCustomerModalComponent implements OnInit, OnDestroy {
    advisorId: string;
    customerList: AssignableCustomerModel[] = [];
    selectedCustomers: AssignableCustomerModel[] = [];
    searchControl = new UntypedFormControl();
    customerControl = new UntypedFormControl();
    CustomerPlan = CustomerPlan;
    RegisterStep = NewRegisterStep;

    displayedColumns = ['index', 'fullName', 'advisoryPlan', 'email', 'fullPhoneNumber', 'registerStep', 'remove'];

    private unsubscribe = new Subject();

    constructor(
        private advisorService: AdvisorService,
        private popupService: PopupService,
        private modal: NgbActiveModal
    ) { }

    ngOnInit(): void {
        this.getCustomerList("");

        this.searchControl.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe(value => {
                this.getCustomerList(value);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    getCustomerList(search: string): void {
        this.advisorService.getAssignableCustomerList(search).subscribe(
            (response) => {
                this.customerList = response;
            }
        );
    }

    updateSelection(isOpen: boolean) {
        if (isOpen) return;

        this.customerControl.value.forEach(newSelection => {
            if (!this.selectedCustomers.find(customer => customer.id == newSelection.id))
                this.selectedCustomers.push(newSelection);
        });

        this.assignIndex(this.selectedCustomers);
        this.selectedCustomers = [...this.selectedCustomers];
        this.customerControl.patchValue([]);
    }

    assignIndex(list: any[]) {
        list.forEach((data, index) => {
            data.index = index + 1;
        });
    }

    removeCustomer(customer: AssignableCustomerModel) {
        const index = this.selectedCustomers.indexOf(customer);

        if (index == -1) return;
        this.selectedCustomers.splice(index, 1);
        this.assignIndex(this.selectedCustomers);
        this.selectedCustomers = [...this.selectedCustomers];
    }

    toggleAll(selected: boolean) {
        if (selected) {
            this.customerControl.patchValue(this.customerList);
        }
        else {
            this.customerControl.patchValue([]);
        }
    }

    submit() {
        if (this.selectedCustomers.length == 0) {
            this.popupService.alert('Please select a customer.');
            return;
        }

        const customerIds = this.selectedCustomers.map(customer => customer.id);

        this.advisorService.assignAdvisorWithCustomers(this.advisorId, customerIds).subscribe(
            () => {
                this.popupService.alert('Customer assigned to the Advisor.').then(
                    () => {
                        this.modal.close();
                    }
                )
            }
        );
    }

    cancel() {
        this.modal.dismiss();
    }

    onSortChange(event) {
        const { active, direction } = event;

        if (!direction) return;

        this.selectedCustomers = this.selectedCustomers.sort((a, b) => {
            if (direction == 'asc')
                return a[active] < b[active] ? -1 : 1;
            else
                return a[active] < b[active] ? 1 : -1;
        });
        this.assignIndex(this.selectedCustomers);
        this.selectedCustomers = [...this.selectedCustomers];
    }
}
