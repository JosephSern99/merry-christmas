import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ListingFilterModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecurringPaymentService } from 'src/app/core/services/api/recurring-payment.service';
import { RecurringSystemListModel } from 'src/app/core/models/recurring-payment/recurring-payment.model';
import { UploadDocumentComponent } from 'src/app/pages/verifier/recurring-payment/upload-document/upload-document.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-recurring-payment-listing',
    templateUrl: './recurring-payment-listing.component.html',
    styleUrls: ['./recurring-payment-listing.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatProgressBarModule,
        MatButton
    ]
})
export class RecurringPaymentListingComponent extends ListingPopupBaseComponent {

    displayedColumns: string[] = ['index', 'document', 'upload-date', 'action'];
    listingDataSource: RecurringSystemListModel[] = [];
    private fileDownloadName: string;

    constructor(
        protected apiService: RecurringPaymentService,
        protected formBuilder: UntypedFormBuilder,
        private modalService: NgbModal,
    ) {
        super(apiService, formBuilder);
    }

    protected generateListingFilterParam(): ListingFilterModel {
        let newFilter: ListingFilterModel = super.generateListingFilterParam();
        if (newFilter.keywords.length > 0) {
            newFilter.keywordsField = 'FullName';
        }

        return newFilter;
    }

    uploadDocument(): void {
        const option: any = {
            size: 'lg',
            center: true,
            windowClass: 'modal-upload-document',
            backdropClass: 'backdrop-popup',
            centered: true,
        };
        const modalRef = this.modalService.open(UploadDocumentComponent, option);
        modalRef.result.finally(() => {
            this.getListing();
        })
    }

    downloadDocument(fileName: string, data: any) {
        this.fileDownloadName = data;
        let anchor = document.createElement('a');
        anchor.href = this.fileDownloadName;
        anchor.target = '_blank';
        anchor.click();
      }

}
