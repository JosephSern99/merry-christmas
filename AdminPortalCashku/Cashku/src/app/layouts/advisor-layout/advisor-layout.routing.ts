import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/core/services/guard/can-deactivate-guard';
import { FundsComponent } from 'src/app/pages/admin/customer/customer-detail/funds/funds.component';
import { DirectDebitComponent } from 'src/app/pages/admin/customer/customer-detail/goals/direct-debit/direct-debit.component';
import { GoalDetailComponent } from 'src/app/pages/admin/customer/customer-detail/goals/goal-detail/goal-detail.component';
import { TransactionHistoryComponent } from 'src/app/pages/admin/customer/customer-detail/goals/transaction-history/transaction-history.component';
import { AccountSettingsComponent } from 'src/app/pages/advisor/account-settings/account-settings.component';
import { BasicInfoComponent } from 'src/app/pages/advisor/customer/customer-detail/basic-info/basic-info.component';
import { CustomerDetailComponent } from 'src/app/pages/advisor/customer/customer-detail/customer-detail.component';
import { GoalsComponent } from 'src/app/pages/advisor/customer/customer-detail/goals/goals.component';
import { InternalNotesComponent as InternalNotesAdvisorCustomerComponent } from 'src/app/pages/advisor/customer/customer-detail/internal-notes/internal-notes.component';
import { PlannerNotesComponent as CustomerPlannerNotes } from 'src/app/pages/advisor/customer/customer-detail/planner-notes/planner-notes.component';
import { PortfolioComponent } from 'src/app/pages/advisor/customer/customer-detail/portfolio/portfolio.component';
import { CustomerListingComponent } from 'src/app/pages/advisor/customer/customer-listing.component';
import { InternalNotesSpecialDetailComponent } from 'src/app/pages/advisor/internal-notes-special/internal-notes-special-detail/internal-notes-special-detail.component';
import { InternalNotesSpecialEditComponent } from 'src/app/pages/advisor/internal-notes-special/internal-notes-special-edit/internal-notes-special-edit.component';
import { InternalNoteCreateComponent } from 'src/app/pages/advisor/internal-notes/internal-note-create/internal-note-create.component';
import { InternalNotesDetailComponent } from 'src/app/pages/advisor/internal-notes/internal-notes-detail/internal-notes-detail.component';
import { InternalNotesComponent } from 'src/app/pages/advisor/internal-notes/internal-notes.component';
import { PlannerNotesSpecialDetailComponent } from 'src/app/pages/advisor/planner-notes-special/planner-notes-special-detail/planner-notes-special-detail.component';
import { PlannerNotesSpecialEditComponent } from 'src/app/pages/advisor/planner-notes-special/planner-notes-special-edit/planner-notes-special-edit.component';
import { PlannerNoteCreateComponent } from 'src/app/pages/advisor/planner-notes/planner-note-create/planner-note-create.component';
import { PlannerNotesDetailComponent } from 'src/app/pages/advisor/planner-notes/planner-notes-detail/planner-notes-detail.component';
import { PlannerNotesComponent } from 'src/app/pages/advisor/planner-notes/planner-notes.component';
import { WithdrawalListComponent } from 'src/app/pages/advisor/withdrawals/withdrawal-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'advisor', pathMatch: 'full', title: 'Advisor' },

    {
        path: 'advisor-customer', title: 'My Client', component: CustomerListingComponent, data: { title: 'My Client' }, children: [
            { path: 'account-settings-advisor', title: 'Account Settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
            { path: 'detail', redirectTo: '' },
            {
                path: 'detail/:id', title: '{{customerName}}', component: CustomerDetailComponent, data: { title: '{{customerName}}' }, children: [
                    { path: '', redirectTo: 'basic-info' },
                    { path: 'basic-info', title: 'Basic Info', component: BasicInfoComponent },
                    { path: 'portfolio', title: 'Portfolio', component: PortfolioComponent },
                    { path: 'goals', title: 'Goals', component: GoalsComponent },
                    { path: 'funds', title: 'Funds', component: FundsComponent },
                    { path: 'goals', title: 'Goals', component: GoalsComponent, children: [
                        { path: '', redirectTo: 'details' },
                        { path: 'details', title: 'Goal Details', component: GoalDetailComponent },
                        { path: 'transaction-history', title: 'Transaction History', component: TransactionHistoryComponent },
                        { path: 'direct-debit', title: 'Direct Debit', component: DirectDebitComponent },
                    ] },
                    { path: 'planner-notes', title: 'Planner Notes', component: CustomerPlannerNotes },
                    // { path: 'planner-notes/:id/edit', component: PlannerNoteCreateComponent, canDeactivate: [CanDeactivateGuard] },
                    { path: 'internal-notes', title: 'Internal Notes', component: InternalNotesAdvisorCustomerComponent },
                ]
            },
            { path: 'detail/:id/planner-notes/create', title: 'Create Planner Notes', component: PlannerNotesSpecialEditComponent, data: { isAdd: true }, canDeactivate: [CanDeactivateGuard] },
            { path: 'detail/:id/planner-notes/:noteID', title: 'Planner Notes', component: PlannerNotesSpecialDetailComponent },
            { path: 'detail/:id/planner-notes/:noteID/edit', title: 'Edit Planner Notes', component: PlannerNotesSpecialEditComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'detail/:id/internal-notes/create', title: 'Create Internal Notes', component: InternalNotesSpecialEditComponent, data: { isAdd: true }, canDeactivate: [CanDeactivateGuard] },
            { path: 'detail/:id/internal-notes/:noteID', title: 'Internal Notes', component: InternalNotesSpecialDetailComponent },
            { path: 'detail/:id/internal-notes/:noteID/edit', title: 'Edit Internal Notes', component: InternalNotesSpecialEditComponent, canDeactivate: [CanDeactivateGuard] },
            // { path: 'detail/:id/create-internal', component: InternalNoteCreateComponent, data: { title: 'Create Note', isAdd: true , isSingle: true}, canDeactivate: [CanDeactivateGuard] }
        ]
    },

    {
        path: 'advisor-planner-notes', title: 'Advisor Notes', component: PlannerNotesComponent, data: { title: 'Advisor Notes' },
        children: [
            { path: 'detail', redirectTo: '' },
            { path: 'detail/:id', title: 'Advisor Note Details', component: PlannerNotesDetailComponent, data: { title: 'Advisor Note Details' } },
            { path: 'detail/:id/edit', title: 'Edit Advisor Note', component: PlannerNoteCreateComponent, data: { title: 'Edit Advisor Note' }, canDeactivate: [CanDeactivateGuard] },
            { path: 'create', title: 'Create Note', component: PlannerNoteCreateComponent, data: { title: 'Create Note', isAdd: true }, canDeactivate: [CanDeactivateGuard] }
        ]
    },

    {
        path: 'advisor-internal-notes', title: 'Internal Notes', component: InternalNotesComponent, data: { title: 'Internal Notes' },
        children: [
            { path: 'detail', redirectTo: '' },
            { path: 'detail/:id', title: 'Advisor Internal Note Details', component: InternalNotesDetailComponent, data: { title: 'Advisor Internal Note Details'} },
            { path: 'detail/:id/edit', title: 'Edit Internal Note', component: InternalNoteCreateComponent, data: { title: 'Edit Internal Note' }, canDeactivate: [CanDeactivateGuard] },
            { path: 'create', title: 'Create Internal Note', component: InternalNoteCreateComponent, data: { title: 'Create Internal Note', isAdd: true }, canDeactivate: [CanDeactivateGuard] }
        ]
    },

    { path: 'advisor-customer/detail/:customerID/internal-notes/:id', title: 'Internal Notes', component: InternalNotesDetailComponent },
    { path: 'advisor-customer/detail/:customerID/internal-notes/:id/edit', title: 'Edit Internal Note', component: InternalNoteCreateComponent },

    { path: 'withdrawals', title: 'Withdrawals', component: WithdrawalListComponent, data: { title: 'Withdrawals' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class AdvisorLayoutRoutingModule { }
