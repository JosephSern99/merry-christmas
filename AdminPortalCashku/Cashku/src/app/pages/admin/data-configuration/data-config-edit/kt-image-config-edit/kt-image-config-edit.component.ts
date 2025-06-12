import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { REGEX_IMAGE_EXTENSION } from 'src/app/core/constants/app.constants';
import { SettingType } from 'src/app/core/constants/data-config.constants';
import { KakitanganImageModel } from 'src/app/core/models/data-configuration/data-configuration.model';
import { DataConfigurationService } from 'src/app/core/services/api/data-configuration.service';
import { ListingPopupEditComponent } from 'src/app/pages/admin/listing-popup/base-edit/base-edit.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-kt-image-config-edit',
    templateUrl: './kt-image-config-edit.component.html',
    styleUrls: ['./kt-image-config-edit.component.scss'],
    standalone: false
})
export class KtImageConfigEditComponent extends ListingPopupEditComponent {

    detail!: KakitanganImageModel;
    uploadedImageSrc: SafeUrl;

    private image: File;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected apiService: DataConfigurationService,
        protected formBuilder: UntypedFormBuilder,
        protected location: Location,
        protected popupService: PopupService,
        protected router: Router,
        private blockUIService: BlockUiService,
        private sanitizer: DomSanitizer,
    ) {
        super( apiService, activatedRoute, router, formBuilder, popupService, location );
    }

    getDetail(): void {
        this.apiService.getKtImage().subscribe(
            (success) => { this.handleSuccessResponse(success); },
            (err) => { this.handleErrorResponse(err); }
        );
    }

    onSubmit(): void {
        this.blockUIService.open();

        let data = new FormData();
        data.append('type', `${SettingType.KtBannerImageUrl}`);
        data.append('value', this.image);

        this.apiService.uploadKtImg(data)
            .subscribe(() => {
                this.getDetail();
                this.popupService.alert('Uploaded Successfully.');
            })
            .add(() => {
                this.blockUIService.close();
                this.uploadedImageSrc = null;
                this.image = null;
                this.editForm.reset();
            });
    };

    setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            uploadedImg: ['', [ Validators.required, Validators.pattern(REGEX_IMAGE_EXTENSION) ]],
        });
    };

    onFileSelected(event) {
        const file: File = event.target.files[0];

        if (file) {
            if (this.editForm.invalid || !file.type.includes('image/')) {
                return;
            }

            this.image = file;
            this.uploadedImageSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
        }
    }

}
