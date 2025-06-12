import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/layouts/admin-layout/material/material.module';
import { AdvisorLayoutComponent } from 'src/app/layouts/advisor-layout/advisor-layout.component';
import { FundDetailsComponent } from 'src/app/pages/admin/customer/customer-detail/funds/fund-details/fund-details.component';
import { FundsComponent } from 'src/app/pages/admin/customer/customer-detail/funds/funds.component';
import { PlannerNoteBreadcrumbModule } from 'src/app/pages/admin/planner-notes/planner-note-breadcrumb/planner-note-breadcrumb.module';
import { AccountSettingsComponent } from 'src/app/pages/advisor/account-settings/account-settings.component';
import { BasicInfoComponent } from 'src/app/pages/advisor/customer/customer-detail/basic-info/basic-info.component';
import { CustomerDetailComponent } from 'src/app/pages/advisor/customer/customer-detail/customer-detail.component';
import { GoalsComponent } from 'src/app/pages/advisor/customer/customer-detail/goals/goals.component';
import { InternalNotesComponent as CustomerInternalNotesComponent } from 'src/app/pages/advisor/customer/customer-detail/internal-notes/internal-notes.component';
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
import { SharedModule } from 'src/app/shared/shared.module';
import { AdvisorLayoutRoutingModule } from './advisor-layout.routing';

@NgModule({
    declarations: [
        AccountSettingsComponent,
        AdvisorLayoutComponent,
        BasicInfoComponent,
        CustomerDetailComponent,
        CustomerInternalNotesComponent,
        CustomerListingComponent,
        CustomerListingComponent,
        CustomerPlannerNotes,
        FundsComponent,
        GoalsComponent,
        InternalNoteCreateComponent,
        InternalNotesComponent,
        InternalNotesDetailComponent,
        InternalNotesSpecialDetailComponent,
        InternalNotesSpecialEditComponent,
        PlannerNoteCreateComponent,
        PlannerNotesSpecialDetailComponent,
        PlannerNotesSpecialEditComponent,
        PortfolioComponent,

    ],
    imports: [
        AdvisorLayoutRoutingModule,
        // CKEditorModule,
        CommonModule,
        CoreModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        PlannerNoteBreadcrumbModule,
        PlannerNotesComponent,
        PlannerNotesDetailComponent,
        WithdrawalListComponent,
        FundDetailsComponent,
    ]
})
export class AdvisorLayoutModule { }
