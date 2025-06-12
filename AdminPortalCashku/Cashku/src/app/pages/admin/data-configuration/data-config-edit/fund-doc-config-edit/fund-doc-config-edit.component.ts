import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentationsConfigurationDetailModel } from 'src/app/core/models/data-configuration/data-configuration.model';
import { DataConfigurationService } from 'src/app/core/services/api/data-configuration.service';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { ListingPopupEditComponent } from '../../../listing-popup/base-edit/base-edit.component';

@Component({
    selector: 'app-fund-doc-config-edit',
    templateUrl: './fund-doc-config-edit.component.html',
    styleUrls: ['./fund-doc-config-edit.component.scss'],
    standalone: false
})
export class FundDocConfigEditComponent extends ListingPopupEditComponent implements OnInit {

    detail: DocumentationsConfigurationDetailModel;
    editForm: UntypedFormGroup;
    editDetailForm: UntypedFormGroup;
    editDocForm: UntypedFormGroup;
    panelOpenState = true;
    showFormError = false;

    constructor(
        protected apiService: DataConfigurationService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected formBuilder: UntypedFormBuilder,
        protected popupService: PopupService,
        protected location: Location,
        private blockUIService: BlockUiService,
    ) {
        super(apiService, activatedRoute, router, formBuilder, popupService, location);
    }


    onSubmit(): void {

        if (this.editForm.invalid) {
            this.showFormError = true;
            return
        }

        this.showFormError = false;

        this.blockUIService.open();

        // this.apiService.(this.editForm.value, this.id).subscribe(
        //     data => {
        //         this.popupService.alert('Customer detail successfully updated.').then((): void => {
        //             this.isChangesSaved = true;
        //             this.isRefresh = true;
        //             this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        //         });
        //     }
        // ).add((): void => {
        //     this.blockUIService.close();
        // });
    }

    protected setupEditForm(): void {

        this.editForm = this.formBuilder.group({
            annualReport: [ this.detail.easeRename_dcdmAnnualReport, Validators.required ],
            factSheet: [ this.detail.easeRename_dcdmFundFactsheet, Validators.required ],
            fundName: [ { value: this.detail.easeRename_dcdmFundName, disabled: true }, Validators.required ],
            highlightSheet: [ this.detail.easeRename_dcdmHighlightSheet, Validators.required ],
            memorandum: [ this.detail.easeRename_dcdmMemorandum, Validators.required ],
            semiAnnualReport: [ this.detail.easeRename_dcdmSemiAnnualReport, Validators.required ],
            suppProspectus: [ this.detail.easeRename_dcdmSuppProspectus, Validators.required ],
            y1History: [ this.detail.easeRename_dcdmReturnHistory.y1, Validators.required ],
            y2History: [ this.detail.easeRename_dcdmReturnHistory.y2, Validators.required ],
            y3History: [ this.detail.easeRename_dcdmReturnHistory.y3, Validators.required ],
            y5History: [ this.detail.easeRename_dcdmReturnHistory.y5, Validators.required ],
            yearToDatePerformance: [ this.detail.easeRename_dcdmYearToDatePerformance, Validators.required ],
        })
    }

    detailPopup(): void {
        this.popupService.fundNameChangeAlert();
    }

    getBreadCrumbs() {
        return  [
            { path: '/data-configuration/', title: 'Data Configuration' },
            { path: '../', title: this.detail.easeRename_dcdmFundName },
            { path: '', title: 'Edit Fund Details / Documentation' },
        ];
    }

}
