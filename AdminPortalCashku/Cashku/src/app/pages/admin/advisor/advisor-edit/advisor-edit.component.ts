import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';
import { AdvisorService } from 'src/app/core/services/api/advisor.service';
import { EmailValidator } from 'src/app/core/validators/email-validator';
import { PhoneNumberValidator } from 'src/app/core/validators/phone-number.validator';
import { ListingPopupEditComponent } from 'src/app/pages/admin/listing-popup/base-edit/base-edit.component';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-advisor-edit',
    templateUrl: './advisor-edit.component.html',
    styleUrls: ['./advisor-edit.component.scss'],
    standalone: false
})

export class AdvisorEditComponent extends ListingPopupEditComponent implements OnInit {
    editForm: UntypedFormGroup;
    showFormError: boolean = false;
    advisorId: string | number;
    showCopyTooltip = false;

    constructor(
        protected apiService: AdvisorService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected formBuilder: UntypedFormBuilder,
        protected popupService: PopupService,
        protected location: Location,
        private blockUIService: BlockUiService,
    ) {
        super(apiService, activatedRoute, router, formBuilder, popupService, location);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initCountryCodeSubscription();
    }

    protected fillDataToEditForm(): void {
        super.fillDataToEditForm();
        this.editForm.controls.phoneNumber.setValidators(
            [Validators.required, PhoneNumberValidator(this.editForm.controls.countryCode.value)]
        );
    }

    private initCountryCodeSubscription() {
        this.editForm.controls.phoneNumber.setValidators(
            [Validators.required, PhoneNumberValidator()]
        );
        this.editForm.controls.countryCode.valueChanges
            .subscribe((value) => {
                this.editForm.controls.phoneNumber.setValidators(
                    [Validators.required, PhoneNumberValidator(value)]
                );
                this.editForm.controls.phoneNumber.patchValue(this.editForm.controls.phoneNumber.value);
            });
    }

    onSubmit(): void {
        if (this.editForm.invalid) {
            this.showFormError = true;
            return
        }

        this.showFormError = false;

        this.blockUIService.open();
        this.isChangesSaved = true;

        let observable$ = this.isAddOperation
            ? this.apiService.createAdvisor(this.editForm.value)
            : this.apiService.updateAdvisor(this.editForm.value, this.id);

        observable$
            .pipe(
                tap(() => {
                    const msg = `Successfully ${this.isAddOperation ? 'create a new' : 'update'} Advisor ${this.editForm.value.fullName}`;
                    this.popupService
                        .alert(msg)
                        .then(() => {
                            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                            this.router.onSameUrlNavigation = 'reload';
                            this.back();
                        });
                }),
                finalize(() => {
                    this.isRefresh = true;
                    this.blockUIService.close();
                })
            )
            .subscribe();
    }

    protected setupEditForm(): void {
        this.editForm = this.formBuilder.group({
            countryCode: [0, Validators.required],
            email: ['', [Validators.required, Validators.email, EmailValidator()]],
            fullName: ['', [Validators.required, this.noWhitespaceValidator]],
            phoneNumber: ['', Validators.required],
        });
    }

    private back(): void {
        this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    }

    copyFunction() {
        navigator.clipboard.writeText(this.editForm.value.calendlyLink);
        this.showCopyTooltip = true;

        setTimeout(() => {
            this.showCopyTooltip = false;
        }, 1500);
    }

    noWhitespaceValidator(control: UntypedFormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }
}
