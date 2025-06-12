import { NgModule } from '@angular/core';
import { RecurringPaymentListingComponent } from 'src/app/pages/verifier/recurring-payment/recurring-payment-listing.component';
import { ReportComponent } from 'src/app/pages/verifier/report/report.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'verifier-report', pathMatch: 'full', title: 'Verifier' },

    { path: 'verifier-report' , component: ReportComponent, title: 'Verifier Report' },

    // { path: 'verifier-recurring-payment', component: RecurringPaymentListingComponent, data: {title: 'Recurring Payment List'} },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class VerifierLayoutRoutingModule { }
