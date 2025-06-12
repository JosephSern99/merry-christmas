import { ActionType, ModuleType } from 'src/app/core/constants/audit.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditDetailModel } from 'src/app/core/models/audit/audit.model';
import { AuditService } from 'src/app/core/services/api/audit.service';
import { Component, OnInit } from '@angular/core';
import { ListingPopupDetailComponent } from 'src/app/pages/admin/listing-popup/base-detail/base-detail.component';

@Component({
    selector: 'app-audit-detail',
    templateUrl: './audit-detail.component.html',
    styleUrls: ['./audit-detail.component.scss'],
    standalone: false
})
export class AuditDetailComponent extends ListingPopupDetailComponent implements OnInit {
    ActionType = ActionType;
    detail: AuditDetailModel;
    ModuleType = ModuleType;

    constructor(
        protected apiService: AuditService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router
    ) {
        super(apiService, activatedRoute, router);
    }

    protected handleSuccessResponse(response: AuditDetailModel): void {
        super.handleSuccessResponse(response);
        this.detail.changes = this.detail.changes.map(change => ({
            ...change,
            uiPropertyName: change.propertyName.replace(/([A-Z])/g, ' $1').trim()
        }));
    }

    protected handleErrorResponse(err: any): void {
        if (err.statusCode !== 401) {
            this.router.navigate(['/audit']);
        }
    }
}
