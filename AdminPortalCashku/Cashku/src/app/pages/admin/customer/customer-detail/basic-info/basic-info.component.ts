import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderOptions, RaceOptions, RiskToleranceOptions } from 'src/app/core/constants/basic-info.constants';
import { AppType, CustomerPlan, CustomerRegisteredAs, CustomerRegistrationStatus, NewRegisterStep } from 'src/app/core/constants/customer.constants';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { CustomerDetailModel } from 'src/app/core/models/customer/customer.model';
import { Countries } from 'src/app/core/models/profile/profile.model';
import { CountriesService } from 'src/app/core/services/api/countries.service';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { CustomerSubTabComponent } from 'src/app/pages/admin/customer/customer-detail/customer-sub-tab.component';

@Component({
    selector: 'app-basic-info',
    templateUrl: './basic-info.component.html',
    styleUrls: ['./basic-info.component.scss'],
    standalone: false
})
export class BasicInfoComponent extends CustomerSubTabComponent {
    AppType = AppType;
    countries: Countries[];
    customerDetail: CustomerDetailModel;
    CustomerPlan = CustomerPlan;
    RiskToleranceOptions = RiskToleranceOptions
    GenderOptions = GenderOptions;
    RaceOptions = RaceOptions;
    RegistrationStatus = CustomerRegistrationStatus;
    CustomerRegisteredAs = CustomerRegisteredAs;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected customerApi: CustomerService,
        protected countriesServiceApi: CountriesService,
        protected router: Router,
    ) {
        super(activatedRoute);
        this.countriesServiceApi.getCountries().subscribe((countries) => {
            this.countries = countries;
        })
    }

    getSubTab(): DetailSubTab {
        return DetailSubTab.BasicInfo;
    }

    protected getFromAPI(): void {
        this.customerApi.getDetail(this.customerID).subscribe(
            (success: CustomerDetailModel) => {
                this.customerDetail = success;
                this.customerDetail.bankDetails = this.customerDetail.bankDetails.filter(bank => !!bank.bankAccountNumber);
                if (this.customerDetail.bankDetails.length === 0) {
                    this.customerDetail.bankDetails =  BANK_DETAIL_PLACEHOLDER.map(detail => ({
                        ...detail,
                        createdDate: detail.bankCreatedDate || new Date().toISOString() // Add missing property
                    }));;

                }
                if (!this.customerDetail.tinDetail || this.customerDetail.tinDetail.length === 0) {
                    this.customerDetail.tinDetail = TIN_DETAIL_PLACEHOLDER;
                }
                this.customerDetail.uiRegisterStep = NewRegisterStep[this.customerDetail.registerStep];
            },
            (error) => {
                console.error('[API]', error);
                if (error.error.statusCode === 400) {
                    this.router.navigate(['/customer']);
                }
            },
        ).add(() => this.isLoading = false);
    }
}

const TIN_DETAIL_PLACEHOLDER = [{ countryId: null, countryName: null, tin: null }];
const BANK_DETAIL_PLACEHOLDER = [{ bankName: null, bankCreatedDate: null, bankAccountNumber: null }];
