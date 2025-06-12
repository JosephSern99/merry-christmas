import { ActivatedRoute, Router } from '@angular/router';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { CanComponentDeactivate } from 'src/app/core/services/guard/can-deactivate-guard';
import { Component, OnInit } from '@angular/core';
import { DetailInterface } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ListingPopupDetailComponent } from '../base-detail/base-detail.component';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { PopupOptions } from 'src/app/shared/services/popup/popup-options';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'agmo-listing-popup-edit',
    template: '<p>agmo-listing-popup-edit works!</p>',
    standalone: false
})
export abstract class ListingPopupEditComponent extends ListingPopupDetailComponent implements OnInit, CanComponentDeactivate {

    editForm: UntypedFormGroup;
    isAddOperation: boolean = false;
    protected isChangesSaved: boolean = false;

    constructor(
        protected apiService: BaseApiService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected formBuilder: UntypedFormBuilder,
        protected popupService: PopupService,
        protected location: Location
    ) {
        super(apiService, activatedRoute, router);
    }

    ngOnInit(): void {
        this.getOperation();
        this.setupEditForm();

        if (this.isAddOperation) {
            return;
        }

        super.ngOnInit();
    }

    protected fillDataToEditForm(): void {
        this.editForm.patchValue(this.detail);
    }

    protected getOperation(): void {
        this.isAddOperation = (typeof this.activatedRoute.snapshot.data['isAdd'] === 'boolean') ? this.activatedRoute.snapshot.data['isAdd'] : false;
    }

    protected handleSuccessResponse(response: DetailInterface) {
        super.handleSuccessResponse(response);

        this.fillDataToEditForm();
    }

    abstract onSubmit(): void;
    protected abstract setupEditForm(): void;

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.editForm) {
            return true;
        }

        if (this.editForm.dirty === false) {
            return true;
        }

        if (this.isChangesSaved) {
            return true;
        }

        return this.popupService.confirm("Changes have not been saved.\nDo you wish to proceed?", {
            okLabel: 'Leave',
            cancelLabel: 'Cancel',
        } as PopupOptions)
            .then(
                () => true,
                () => {
                    const currentUrl = this.router.url;
                    if (this.location.isCurrentPathEqualTo(currentUrl)) {
                      // https://github.com/angular/angular/issues/13586
                      this.router.navigate([currentUrl], { skipLocationChange: true });
                    } else {
                      // manually add browser history back.
                      history.pushState(null, null, location.href);
                    }
                    return false;
                }
            );
    };
}
