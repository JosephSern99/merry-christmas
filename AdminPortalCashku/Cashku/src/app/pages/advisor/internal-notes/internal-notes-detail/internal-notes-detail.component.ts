import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { InternalNotesService } from 'src/app/core/services/api/internal-notes.service';
import { PlannerNotesDetailComponent } from 'src/app/pages/advisor/planner-notes/planner-notes-detail/planner-notes-detail.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-internal-notes-detail',
    templateUrl: './internal-notes-detail.component.html',
    styleUrls: ['./internal-notes-detail.component.scss'],
    standalone: false
})
export class InternalNotesDetailComponent extends PlannerNotesDetailComponent {
    displayedColumns: string[] = ['index', 'fullname', 'email', 'fullPhoneNumber'];
    isFromClientPage: boolean;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected apiService: InternalNotesService,
        protected customerService: CustomerService,
        protected popupService: PopupService,
        protected route: ActivatedRoute,
        protected router: Router,
    ) {
        super(activatedRoute, apiService, customerService, popupService, route, router);
    }

    getEditRoute(): string[] {
        if (this.customerID) {
            if (this.templateForRole === 'admin') {
                return [`/admin-internal-notes/detail/${this.id}/${this.customerID}/edit`];
            }

            return [`/advisor-customer/detail/${this.customerID}/internal-notes/${this.id}/edit`];
        }

        return [`/advisor-internal-notes/detail/${this.id}/edit`];
    }

    getBreadcrumbs(): { path: string, title: string }[] {
        if (this.templateForRole === 'admin') {
            return [
                { path: '/customer', title: 'Client List' },
                { path: `/customer/detail/${this.customerID}/internal-notes`, title: this.customerName },
                { path: '', title: 'Internal Note Details' },
            ];
        }

        return [
            { path: '/advisor-customer', title: 'Client List' },
            { path: `/advisor-customer/detail/${this.customerID}/internal-notes`, title: this.customerName },
            { path: '', title: 'Internal Notes' },
        ];
    }

    getBackBtnUrl(): string[] {
        if (this.customerID) {
            if (this.templateForRole === 'admin') {
                return [`/customer/detail/${this.customerID}/internal-notes`];
            }

            return [`/advisor-customer/detail/${this.customerID}/internal-notes`];
        }

        return ['../'];
    }
}
