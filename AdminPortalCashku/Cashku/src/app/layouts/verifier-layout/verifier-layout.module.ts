import { CommonModule } from "@angular/common";
import { CoreModule } from "src/app/core/core.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/layouts/admin-layout/material/material.module";
import { NgModule } from "@angular/core";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { RecurringPaymentListingComponent } from "src/app/pages/verifier/recurring-payment/recurring-payment-listing.component";
import { ReportComponent } from "src/app/pages/verifier/report/report.component";
import { SharedModule } from "src/app/shared/shared.module";
import { UploadDocumentComponent } from "src/app/pages/verifier/recurring-payment/upload-document/upload-document.component";
import { VerifierDateTimePickerComponent } from "src/app/shared/components/datetimepicker/verifier-datetimepicker";
import { VerifierLayoutComponent } from "src/app/layouts/verifier-layout/verifier-layout.component";
import { VerifierLayoutRoutingModule } from "src/app/layouts/verifier-layout/verifier-layout.routing";

@NgModule({
    declarations: [
        UploadDocumentComponent,
        VerifierLayoutComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        MaterialModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
        SharedModule,
        VerifierLayoutRoutingModule,
        RecurringPaymentListingComponent,
        ReportComponent,
        VerifierDateTimePickerComponent,
    ],
    exports:[
        CommonModule,
        CoreModule,
        FormsModule,
        MaterialModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
        SharedModule,
        VerifierLayoutRoutingModule,
        RecurringPaymentListingComponent,
        ReportComponent,
        VerifierDateTimePickerComponent,
    ]
})
export class VerifierLayoutModule { }
