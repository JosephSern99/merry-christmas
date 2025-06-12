import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
// import { DigitOnlyModule } from '@uiowa/digit-only';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CoreModule } from 'src/app/core/core.module';
import { AdminLayoutRoutingModule } from 'src/app/layouts/admin-layout/admin-layout.routing';
import { MaterialModule } from 'src/app/layouts/admin-layout/material/material.module';
import { AccountSettingsComponent } from 'src/app/pages/admin/account-settings/account-settings.component';
import { AdvisorDetailComponent } from 'src/app/pages/admin/advisor/advisor-detail/advisor-detail.component';
import { AssignCustomerModalComponent } from 'src/app/pages/admin/advisor/advisor-detail/assign-customer-modal/assign-customer-modal.component';
import { CustomerComponent as AdvisorCustomerComponent } from 'src/app/pages/admin/advisor/advisor-detail/customer/customer.component';
import { PlannerNotesComponent as AdvisorPlannerNotesComponent } from 'src/app/pages/admin/advisor/advisor-detail/planner-notes/planner-notes.component';
import { AdvisorEditComponent } from 'src/app/pages/admin/advisor/advisor-edit/advisor-edit.component';
import { AdvisorListingComponent } from 'src/app/pages/admin/advisor/advisor-listing.component';
import { AdvisorSuspendComponent } from 'src/app/pages/admin/advisor/advisor-suspend/advisor-suspend.component';
import { AssignCustomerListingComponent } from 'src/app/pages/admin/advisor/advisor-suspend/assign-customer-listing/assign-customer-listing.component';
import { AppointmentComponent } from 'src/app/pages/admin/appointment/appointment-list.component';
import { AuditDetailComponent } from 'src/app/pages/admin/audit/audit-detail/audit-detail.component';
import { AuditTrailComponent } from 'src/app/pages/admin/audit/audit-trail.component';
import { BasicInfoComponent } from 'src/app/pages/admin/customer/customer-detail/basic-info/basic-info.component';
import { CustomerDetailComponent } from 'src/app/pages/admin/customer/customer-detail/customer-detail.component';
import { DirectDebitComponent } from 'src/app/pages/admin/customer/customer-detail/goals/direct-debit/direct-debit.component';
import { GoalDetailComponent } from 'src/app/pages/admin/customer/customer-detail/goals/goal-detail/goal-detail.component';
import { GoalsComponent } from 'src/app/pages/admin/customer/customer-detail/goals/goals.component';
import { TransactionHistoryComponent } from 'src/app/pages/admin/customer/customer-detail/goals/transaction-history/transaction-history.component';
import { InternalNoteCreateComponent } from 'src/app/pages/admin/customer/customer-detail/internal-notes/internal-note-create/internal-note-create.component';
import { InternalNotesComponent } from 'src/app/pages/admin/customer/customer-detail/internal-notes/internal-notes.component';
import { PlannerNotesComponent } from 'src/app/pages/admin/customer/customer-detail/planner-notes/planner-notes.component';
import { PortfolioComponent } from 'src/app/pages/admin/customer/customer-detail/portfolio/portfolio.component';
import { CustomerEditComponent } from 'src/app/pages/admin/customer/customer-edit/customer-edit.component';
import { CustomerListingComponent } from 'src/app/pages/admin/customer/customer-listing.component';
import { DashboardDetailComponent } from 'src/app/pages/admin/dashboard/dashboard-detail/dashboard-detail.component';
import { DataInsightsComponent } from 'src/app/pages/admin/dashboard/dashboard-detail/data-insights/data-insights.component';
import { DashboardComponent } from 'src/app/pages/admin/dashboard/dashboard.component';
import { DataConfigBreadcrumbComponent } from 'src/app/pages/admin/data-configuration/data-config-breadcrumb/data-config-breadcrumb.component';
import { FundDocDetailComponent } from 'src/app/pages/admin/data-configuration/data-config-detail/fund-doc-detail/fund-doc-detail.component';
import { ReturnRateDetailComponent } from 'src/app/pages/admin/data-configuration/data-config-detail/return-rate-detail/return-rate-detail.component';
import { FundDocConfigEditComponent } from 'src/app/pages/admin/data-configuration/data-config-edit/fund-doc-config-edit/fund-doc-config-edit.component';
import { KtImageConfigEditComponent } from 'src/app/pages/admin/data-configuration/data-config-edit/kt-image-config-edit/kt-image-config-edit.component';
import { ReturnRateConfigEditComponent } from 'src/app/pages/admin/data-configuration/data-config-edit/return-rate-config-edit/return-rate-config-edit.component';
import { DataConfigurationComponent } from 'src/app/pages/admin/data-configuration/data-configuration.component';
import { FeesManagementListingComponent } from 'src/app/pages/admin/fees-management/fees-management-listing/fees-management-listing.component';
import { CustomerInternalNoteEditSingleComponent } from 'src/app/pages/admin/internal-notes/customer-internal-note-edit-single/customer-internal-note-edit-single.component';
import { CustomerInternalNoteEditComponent } from 'src/app/pages/admin/internal-notes/customer-internal-note-edit/customer-internal-note-edit.component';
import { CustomerInternalNoteComponent } from 'src/app/pages/admin/internal-notes/customer-internal-note/customer-internal-note.component';
import { NotificationsCreateComponent } from 'src/app/pages/admin/notifications/notifications-create/notifications-create.component';
import { NotificationsComponent } from 'src/app/pages/admin/notifications/notifications-listing.component';
import { PassportVerifyComponent } from 'src/app/pages/admin/passport-verify/passport-verify.component';
import { AdvisorPlannerNoteEditComponent } from 'src/app/pages/admin/planner-notes/advisor-planner-note-edit/advisor-planner-note-edit.component';
import { AdvisorPlannerNoteComponent } from 'src/app/pages/admin/planner-notes/advisor-planner-note/advisor-planner-note.component';
import { CustomerPlannerNoteEditComponent } from 'src/app/pages/admin/planner-notes/customer-planner-note-edit/customer-planner-note-edit.component';
import { CustomerPlannerNoteComponent } from 'src/app/pages/admin/planner-notes/customer-planner-note/customer-planner-note.component';
import { PortfolioManagementDetailComponent } from 'src/app/pages/admin/portfolio-management/portfolio-management-detail/portfolio-management-detail.component';
import { PortfolioManagementComponent } from 'src/app/pages/admin/portfolio-management/portfolio-management-listing.component';
import { ReferralListComponent } from 'src/app/pages/admin/referral-list/referral-list.component';
import { ReportEmailInputComponent } from 'src/app/pages/admin/report/report-email-input/report-email-input.component';
import { ReportComponent } from 'src/app/pages/admin/report/report.component';
import { DateTimePickerComponent } from 'src/app/shared/components/datetimepicker/datetimepicker.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { PortfolioRecommendationComponent } from 'src/app/pages/advisor/note/note-detail/portfolio-recommendation/portfolio-recommendation.component';
import { PortfolioRecommendationDetailComponent } from 'src/app/pages/advisor/note/note-detail/portfolio-recommendation-detail/portfolio-recommendation-detail.component';
import { CustomPortfolioComponent } from 'src/app/pages/advisor/note/custom-portfolio/custom-portfolio.component';
import { CustomerInternalNoteWithoutRecommendationPortfolioComponent } from 'src/app/pages/admin/internal-notes/customer-internal-note-without-recommendation-portfolio/customer-internal-note-without-recommendation-portfolio.component';
// import {NgxDateRangeModule} from 'ngx-daterange';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        AdvisorCustomerComponent,
        AdvisorDetailComponent,
        AdvisorEditComponent,
        AdvisorListingComponent,
        AdvisorPlannerNoteComponent,
        AdvisorPlannerNotesComponent,
        AdvisorSuspendComponent,
        AssignCustomerListingComponent,
        AssignCustomerModalComponent,
        AuditDetailComponent,
        BasicInfoComponent,
        CustomerDetailComponent,
        CustomerEditComponent,
        CustomerInternalNoteComponent,
        CustomerInternalNoteEditSingleComponent,
        CustomerListingComponent,
        DashboardComponent,
        DashboardDetailComponent,
        DataConfigBreadcrumbComponent,
        DataConfigurationComponent,
        DataInsightsComponent,
        DirectDebitComponent,
        FeesManagementListingComponent,
        FundDocConfigEditComponent,
        FundDocDetailComponent,
        GoalDetailComponent,
        GoalsComponent,
        InternalNoteCreateComponent,
        InternalNotesComponent,
        KtImageConfigEditComponent,
        NotificationsComponent,
        NotificationsCreateComponent,
        PlannerNotesComponent,
        PortfolioComponent,
        PortfolioManagementComponent,
        PortfolioManagementDetailComponent,
        ReportEmailInputComponent,
        TransactionHistoryComponent,
        PortfolioRecommendationComponent,
        CustomPortfolioComponent,

    ],
    imports: [
        AdminLayoutRoutingModule,
        CommonModule,
        CoreModule,
        FormsModule,
        MaterialModule,
        // NgxDateRangeModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
        SharedModule,
        // DigitOnlyModule,
        AppointmentComponent,
        AccountSettingsComponent,
        AuditTrailComponent,
        CustomerPlannerNoteEditComponent,
        PassportVerifyComponent,
        ReferralListComponent,
        ReportComponent,
        CustomerPlannerNoteComponent,
        DateTimePickerComponent,
        ReturnRateConfigEditComponent,
        ReturnRateDetailComponent,
        PortfolioRecommendationDetailComponent,
        CustomerInternalNoteEditComponent,
        AdvisorPlannerNoteEditComponent,
        CustomerInternalNoteWithoutRecommendationPortfolioComponent,
    ],
    providers: [
        // { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB' },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class AdminLayoutModule { }
