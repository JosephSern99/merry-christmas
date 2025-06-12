import {CommonModule, Location} from '@angular/common';
import { Component } from '@angular/core';
import {ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnRateConfigurationDetailModel } from 'src/app/core/models/data-configuration/data-configuration.model';
import { DataConfigurationService } from 'src/app/core/services/api/data-configuration.service';
import { ListingPopupEditComponent } from 'src/app/pages/admin/listing-popup/base-edit/base-edit.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {ListingPopupBreadcrumbComponent} from '../../../listing-popup/helpers/listing-popup-breadcrumb/listing-popup-breadcrumb.component';

@Component({
    selector: 'app-return-rate-config-edit',
    templateUrl: './return-rate-config-edit.component.html',
    styleUrls: ['./return-rate-config-edit.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ListingPopupBreadcrumbComponent,
        CommonModule
    ]
})
export class ReturnRateConfigEditComponent extends ListingPopupEditComponent {

    detail: ReturnRateConfigurationDetailModel[];
    editForm: UntypedFormGroup;
    showFormError = false;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected apiService: DataConfigurationService,
        protected formBuilder: UntypedFormBuilder,
        protected location: Location,
        protected popupService: PopupService,
        protected router: Router,
        private blockUIService: BlockUiService,
    ) {
        super(apiService, activatedRoute, router, formBuilder, popupService, location);
    }

    getDetail() {
        this.apiService.getSaveFundDetail().subscribe(
            (success) => { this.handleSuccessResponse(success); },
            (err) => { this.handleErrorResponse(err); }
        );
    }

    onSubmit(): void {
        if (this.editForm.invalid) {
            this.showFormError = true;
            return
        }

        this.showFormError = false;
        this.blockUIService.open();

        this.apiService.updateSaveFundDetail(this.id, this.editForm.value).subscribe(
            () => {
                this.popupService.alert('Customer detail successfully updated.').then((): void => {
                    this.isChangesSaved = true;
                    this.isRefresh = true;
                    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
                });
            }
        ).add((): void => {
            this.blockUIService.close();
        });
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({});
    }

    protected fillDataToEditForm(): void {
        for (let i = 0; i < this.detail.length; i++) {
            let subDetail = this.detail[i];
            let formKey = subDetail.section;

            this.editForm.addControl(
                formKey, this.formBuilder.array([]),
            )

            let subSection = this.editForm.controls[formKey] as UntypedFormArray;

            for (let j = 0; j < subDetail.data.length; j++) {
                let subDetailData = subDetail.data[j];

                subSection.push(this.formBuilder.group({
                    type: [subDetailData.type],
                    value: [subDetailData.value, Validators.required],
                }));
            }
        }
    }

    getSubSection(key: string): UntypedFormArray {
        return this.editForm.controls[key] as UntypedFormArray;
    }
}
