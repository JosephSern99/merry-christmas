import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/layouts/admin-layout/material/material.module';
import { ListingPopupBreadcrumbModule } from 'src/app/pages/admin/listing-popup/helpers/listing-popup-breadcrumb/listing-popup-breadcrumb.module';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { TopBarModule } from 'src/app/shared/components/top-bar/top-bar.module';
import { EnumToArrayPipe } from 'src/app/shared/pipes/enum-to-array.pipe';
import { NumberSuffixPipe } from 'src/app/shared/pipes/number-suffix.pipe';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { BlockUiModalComponent } from 'src/app/shared/services/blockUi/block-ui-modal.component';
import { LoaderComponent } from 'src/app/shared/services/loader/loader.component';
import { ApproveModalComponent } from 'src/app/shared/services/popup/approve-modal/approve-modal.component';
import { PopupModalComponent } from 'src/app/shared/services/popup/popup-modal.component';
import { PlannerNoteBreadcrumbModule } from '../pages/admin/planner-notes/planner-note-breadcrumb/planner-note-breadcrumb.module';
import { ColorPipe } from './pipes/color.pipe';
import { AdvisorUpdateModalComponent } from './services/popup/advisor-update-modal/advisor-update-modal.component';
import { AssignAdvisorModalComponent } from './services/popup/assign-advisor-modal/assign-advisor-modal.component';
import { FundDocConfigEditModalComponent } from './services/popup/fund-doc-config-edit-modal/fund-doc-config-edit-modal.component';
import { PassportModalComponent } from './services/popup/passport-modal/passport-modal.component';
import { ResetPasswordModalComponent } from './services/popup/reset-password-modal/reset-password-modal.component';
import { SuspendCustomerModalComponent } from './services/popup/suspend-customer-modal/suspend-customer-modal.component';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatFormField, MatInput, MatInputModule} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';

const MATERIAL_MODULES = [
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatLabel,
    MatPaginator,
    MatSelect,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatProgressSpinner,
    MatDatepicker,
    MatTable,
    MatSort,
    MatIcon,
    MatOptionModule,
    MatOption,
    MatProgressBarModule,
    MatProgressBar
];

@NgModule({
    declarations: [
        ApproveModalComponent,
        ColorPipe,
        FundDocConfigEditModalComponent,
        LoaderComponent,
        NumberSuffixPipe,

    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        NgxMatSelectSearchModule,
        ...MATERIAL_MODULES,
        ReactiveFormsModule,
        LoadingComponent,
        SuspendCustomerModalComponent,
        LoadingComponent,
        BlockUiModalComponent,
        ResetPasswordModalComponent,
        PopupModalComponent,
        EnumToArrayPipe,
        PassportModalComponent,
        AdvisorUpdateModalComponent,
        AssignAdvisorModalComponent,
        SafeHtmlPipe
    ],
    exports: [
        DatePipe,
        ColorPipe,
        EnumToArrayPipe,
        ListingPopupBreadcrumbModule,
        NumberSuffixPipe,
        PlannerNoteBreadcrumbModule,
        SafeHtmlPipe,
        SidebarModule,
        TopBarModule,
        NgxMatSelectSearchModule,
        ...MATERIAL_MODULES,
        LoadingComponent,
    ],
    providers: [
        CurrencyPipe
    ]
})
export class SharedModule { }
