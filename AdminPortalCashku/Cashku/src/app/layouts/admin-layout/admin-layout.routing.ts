import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/core/services/guard/can-deactivate-guard';
import { AccountSettingsComponent } from 'src/app/pages/admin/account-settings/account-settings.component';
import { AdvisorDetailComponent } from 'src/app/pages/admin/advisor/advisor-detail/advisor-detail.component';
import { CustomerComponent as AdvisorCustomerComponent } from 'src/app/pages/admin/advisor/advisor-detail/customer/customer.component';
import { PlannerNotesComponent as AdvisorPlannerNotesComponent } from 'src/app/pages/admin/advisor/advisor-detail/planner-notes/planner-notes.component';
import { AdvisorEditComponent } from 'src/app/pages/admin/advisor/advisor-edit/advisor-edit.component';
import { AdvisorListingComponent } from 'src/app/pages/admin/advisor/advisor-listing.component';
import { AdvisorSuspendComponent } from 'src/app/pages/admin/advisor/advisor-suspend/advisor-suspend.component';
import { AppointmentComponent } from 'src/app/pages/admin/appointment/appointment-list.component';
import { AuditDetailComponent } from 'src/app/pages/admin/audit/audit-detail/audit-detail.component';
import { AuditTrailComponent } from 'src/app/pages/admin/audit/audit-trail.component';
import { BasicInfoComponent } from 'src/app/pages/admin/customer/customer-detail/basic-info/basic-info.component';
import { CustomerDetailComponent } from 'src/app/pages/admin/customer/customer-detail/customer-detail.component';
import { FundsComponent } from 'src/app/pages/admin/customer/customer-detail/funds/funds.component';
import { DirectDebitComponent } from 'src/app/pages/admin/customer/customer-detail/goals/direct-debit/direct-debit.component';
import { GoalDetailComponent } from 'src/app/pages/admin/customer/customer-detail/goals/goal-detail/goal-detail.component';
import { GoalsComponent } from 'src/app/pages/admin/customer/customer-detail/goals/goals.component';
import { TransactionHistoryComponent } from 'src/app/pages/admin/customer/customer-detail/goals/transaction-history/transaction-history.component';
import { InternalNotesComponent } from 'src/app/pages/admin/customer/customer-detail/internal-notes/internal-notes.component';
import { PlannerNotesComponent } from 'src/app/pages/admin/customer/customer-detail/planner-notes/planner-notes.component';
import { PortfolioComponent } from 'src/app/pages/admin/customer/customer-detail/portfolio/portfolio.component';
import { CustomerEditComponent } from 'src/app/pages/admin/customer/customer-edit/customer-edit.component';
import { CustomerListingComponent } from 'src/app/pages/admin/customer/customer-listing.component';
import { DashboardDetailComponent } from 'src/app/pages/admin/dashboard/dashboard-detail/dashboard-detail.component';
import { DashboardComponent } from 'src/app/pages/admin/dashboard/dashboard.component';
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
import { ReportComponent } from 'src/app/pages/admin/report/report.component';
import { PortfolioRecommendationComponent } from 'src/app/pages/advisor/note/note-detail/portfolio-recommendation/portfolio-recommendation.component';
import { PortfolioRecommendationDetailComponent } from 'src/app/pages/advisor/note/note-detail/portfolio-recommendation-detail/portfolio-recommendation-detail.component';
import { CustomPortfolioComponent } from 'src/app/pages/advisor/note/custom-portfolio/custom-portfolio.component';
import { CustomerInternalNoteWithoutRecommendationPortfolioComponent } from 'src/app/pages/admin/internal-notes/customer-internal-note-without-recommendation-portfolio/customer-internal-note-without-recommendation-portfolio.component';

/**
 * Define route of admin here.
 */
const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full', title: 'Admin' },

    {
        path: 'dashboard', component: DashboardComponent, title: 'Dashboard', data: { title: 'Dashboard' }, children: [
            { path: '', pathMatch: 'full', redirectTo: 'detail', title: 'Dashboard Detail' },
            { path: 'detail', component: DashboardDetailComponent, data: { title: 'Dashboard Detail' }, title: 'Dashboard Detail' },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' }, title: 'Account Settings' }
        ]
    },

    {
        path: 'portfolio-management', component: PortfolioManagementComponent, title: 'Portfolio Management', data: { title: 'Portfolio Management' }, children: [
            { path: 'edit', redirectTo: '', title: 'Portfolio Management Edit' }, // Redirect to list when no id param.
            { path: 'edit/:id', title: 'Portfolio Management Edit', component: PortfolioManagementDetailComponent, data: { title: '{{portfolioLabel}}' }, canDeactivate: [CanDeactivateGuard] }
        ]
    },

    {
        path: 'customer', component: CustomerListingComponent, title: 'Customer List', data: { title: 'Client List' }, children: [
            { path: 'detail', title: 'Customer Detail', redirectTo: '' }, // Redirect to list when no id param.
            {
                path: 'detail/:id', title: 'Customer Detail', component: CustomerDetailComponent, data: { title: '{{customerName}}' }, children: [
                    { path: '', redirectTo: 'basic-info', title: 'Basic Info' },
                    { path: 'basic-info', component: BasicInfoComponent, title: 'Basic Info' },
                    { path: 'portfolio', component: PortfolioComponent, title: 'Portfolio' },
                    {
                        path: 'goals', component: GoalsComponent, children: [
                            { path: '', redirectTo: 'details', title: 'Goals' },
                            { path: 'details', component: GoalDetailComponent, title: 'Goal Details' },
                            { path: 'transaction-history', component: TransactionHistoryComponent, title: 'Transaction History' },
                            { path: 'direct-debit', component: DirectDebitComponent, title: 'Direct Debit' },
                        ]
                    },
                    { path: 'funds', component: FundsComponent, title: 'Funds' },
                    { path: 'planner-notes', component: PlannerNotesComponent, title: 'Planner Notes' },
                    { path: 'internal-notes', component: InternalNotesComponent, title: 'Internal Notes' },

                ]
            },
            { path: 'detail/:id/internal-notes/create-note', title: 'Create Internal Note', data: { title: 'Create Internal Note', isAdd: true, isSingle: true }, component: CustomerInternalNoteEditSingleComponent },
            { path: 'detail/:id/edit', title: 'Edit Client Basic Info', component: CustomerEditComponent, data: { title: 'Edit Client Basic Info' }, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit', title: 'Edit Client Data', redirectTo: '' },
            { path: 'create', title: 'Create Client', component: CustomerEditComponent, data: { title: 'Create Client', isAdd: true } },
        ]
    },
    { path: 'customer/detail/:id/planner-notes/:noteID', title: 'Planner Notes', component: CustomerPlannerNoteComponent },
    { path: 'customer/detail/:id/planner-notes/:noteID/edit', title: 'Edit Planner Notes', component: CustomerPlannerNoteEditComponent },
    { path: 'customer/detail/:id/internal-notes/:noteID/custom-portfolio', title: 'Custom Portfolio', component: CustomPortfolioComponent },
    { path: 'customer/detail/:id/internal-notes-traditional/:noteID', title: 'Customer Internal Note Without Recommendation Portfolio', component: CustomerInternalNoteWithoutRecommendationPortfolioComponent },
    {
        path: 'customer/detail/:id/internal-notes/:noteID', title: 'Customer Internal Note', component: CustomerInternalNoteComponent, children: [
            { path: '', component: PortfolioRecommendationComponent, title: 'Portfolio Recommendation' },
            { path: ':portfolioID', component: PortfolioRecommendationDetailComponent, title: 'Portfolio Recommendation Detail' },
        ]
    },
    { path: 'customer/detail/:id/internal-notes/:noteID/edit', title: 'Edit Internal Note', component: CustomerInternalNoteEditComponent },

    {
        path: 'advisor', component: AdvisorListingComponent, title: 'Advisor List', data: { title: 'Advisor List' }, children: [
            { path: 'detail', redirectTo: '' }, // Redirect to list when no id param.
            {
                path: 'detail/:id', title: 'Advisor Detail', component: AdvisorDetailComponent, data: { title: '{{advisorName}}' }, children: [
                    { path: '', title: 'Advisor Customer', redirectTo: 'advisor-customer' },
                    { path: 'advisor-customer', title: 'Advisor Customer', component: AdvisorCustomerComponent },
                    { path: 'advisor-planner-notes', title: 'Advisor Planner Notes', component: AdvisorPlannerNotesComponent },
                ]
            },
            { path: 'detail/:id/edit', title: 'Edit Advisor', component: AdvisorEditComponent, data: { title: 'Edit Advisor' }, canDeactivate: [CanDeactivateGuard] },
            { path: 'create', title: 'Create Advisor', component: AdvisorEditComponent, data: { title: 'Create Advisor', isAdd: true }, canDeactivate: [CanDeactivateGuard] },
            { path: 'detail/:id/suspend', title: 'Suspend Advisor', component: AdvisorSuspendComponent, data: { title: 'Suspend Advisor', isDelete: false }, canDeactivate: [CanDeactivateGuard] },
            { path: 'detail/:id/delete', title: 'Delete Advisor', component: AdvisorSuspendComponent, data: { title: 'Delete Advisor', isDelete: true }, canDeactivate: [CanDeactivateGuard] },
        ]
    },
    { path: 'advisor/detail/:id/advisor-planner-notes/:noteID', title: 'Advisor Planner Notes', component: AdvisorPlannerNoteComponent },
    { path: 'advisor/detail/:id/advisor-planner-notes/:noteID/edit', title: 'Edit Planner Notes', component: AdvisorPlannerNoteEditComponent },

    { path: 'referral', title: 'Referral List', component: ReferralListComponent },

    { path: 'passport', title: 'Passport Verification', component: PassportVerifyComponent },

    { path: 'report', title: 'Report', component: ReportComponent },

    { path: 'appointment', title: 'Appointment List', component: AppointmentComponent, data: { title: 'Appointment List' } },

    {
        path: 'fees-management', title: 'Fees Management List', component: FeesManagementListingComponent, data: { title: 'Fees Management List' }, children: [
            { path: 'detail', redirectTo: '' },
        ]
    },

    {
        path: 'data-configuration', title: 'Data Configuration', component: DataConfigurationComponent, data: { title: 'Data Configuration' }, children: [
            { path: 'fund-doc-detail', title: 'Fund Documentation', redirectTo: '' },
            { path: 'fund-doc-detail/:id', title: 'Fund Documentation', component: FundDocDetailComponent, data: { title: '{{fundName}}' } },
            { path: 'fund-doc-detail/:id/edit', title: 'Edit Fund Documentation', component: FundDocConfigEditComponent, data: { title: 'Edit Fund Details / Documentation' }, canDeactivate: [CanDeactivateGuard] },
            { path: 'return-rate-detail', title: 'Return Rate', redirectTo: '' },
            { path: 'return-rate-detail/:id', title: 'Return Rate', component: ReturnRateDetailComponent, data: { title: '{{fundName}}' } },
            { path: 'return-rate-detail/:id/edit', title: 'Edit Return Rate', component: ReturnRateConfigEditComponent, data: { title: 'Edit Return Rate' }, canDeactivate: [CanDeactivateGuard] },
            { path: 'kt-image-edit', title: 'Edit Kakitangan Image', component: KtImageConfigEditComponent, data: { title: 'Edit Kakitangan Image' } },
        ]
    },

    {
        path: 'audit', title: 'Audit Trail', component: AuditTrailComponent, data: { title: 'Audit Trail' }, children: [
            { path: 'detail', title: 'Audit Trail', redirectTo: '' },
            { path: 'detail/:id', title: 'Audit Trail', component: AuditDetailComponent, data: { title: '{{customerName}}' } }
        ]
    },

    {
        path: 'notification', title: 'Notifications List', component: NotificationsComponent, data: { title: 'Notifications List' }, children: [
            { path: 'create', title: 'Create Notification', component: NotificationsCreateComponent, data: { title: 'Create Notification', isAdd: true } }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AdminLayoutRoutingModule { }
