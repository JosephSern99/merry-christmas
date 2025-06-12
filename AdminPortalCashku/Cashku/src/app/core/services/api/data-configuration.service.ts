import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataConfigListModel, DocumentationsConfigurationDetailModel, KakitanganImageModel, ReturnRateApiWrapperModel, ReturnRateConfigurationDetailModel, ReturnRateFormDetailModel, ReturnRateSubDetail } from 'src/app/core/models/data-configuration/data-configuration.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { ListingResponseModel } from 'src/app/pages/admin/listing-popup/base-listing.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DataConfigurationService extends BaseApiService {
    protected endPoint: string = '/Settings';

    constructor(protected http: HttpClient) {
        super(http);

        this.manualConstructor();
    }

    getListing(): Observable<ListingResponseModel<DataConfigListModel>> {
        let dummyResponse = new ListingResponseModel<DataConfigListModel>();

        dummyResponse.data = [
            {
                index: 1,
                easeRename_dclmFundName: 'Test',
                easeRename_dclmId: '1',
            },
            {
                index: 2,
                easeRename_dclmFundName: 'Test 2',
                easeRename_dclmId: '2',
            }
        ];
        dummyResponse.totalCount = dummyResponse.data.length;

        return of(dummyResponse);
    }

    getSaveFundList(): Observable<DataConfigListModel[]> {
        let dummyResponse: DataConfigListModel[] = [];
        dummyResponse = [
            {
                index: 1,
                easeRename_dclmFundName: 'Apex Dana Al-Kanz',
                easeRename_dclmId: '111',
            },
        ];

        return of(dummyResponse);
    }

    getDetail(id: number): Observable<DocumentationsConfigurationDetailModel> {
        let dummyResponse = new DocumentationsConfigurationDetailModel;

        const data = [
            {
                easeRename_dcdmAnnualReport: 'annual',
                easeRename_dcdmFundName: 'ASTUTE DIVIDEND MAXIMISER FUND',
                easeRename_dcdmFundFactsheet: 'https://www.factsheet.com',
                easeRename_dcdmHighlightSheet: 'https://www.highlights.com',
                easeRename_dcdmId: '321',
                easeRename_dcdmMemorandum: 'https://www.memo.com',
                easeRename_dcdmReturnHistory: {
                    y1: 14.32,
                    y2: 20.40,
                    y3: 12.23,
                    y5: 11.92,
                },
                easeRename_dcdmSemiAnnualReport: 'https://www.semiannual.com',
                easeRename_dcdmSuppProspectus: 'https://www.suppProspectus.com',
                easeRename_dcdmYearToDatePerformance: -18.3,
            },
            {
                easeRename_dcdmAnnualReport: 'annual',
                easeRename_dcdmFundName: 'ASTUTE DIVIDEND MAXIMISER FUND',
                easeRename_dcdmFundFactsheet: 'https://www.factsheet.com',
                easeRename_dcdmHighlightSheet: 'https://www.highlights.com',
                easeRename_dcdmId: '213',
                easeRename_dcdmMemorandum: 'https://www.memo.com',
                easeRename_dcdmReturnHistory: {
                    y1: 14.32,
                    y2: 20.40,
                    y3: 12.23,
                    y5: 11.92,
                },
                easeRename_dcdmSemiAnnualReport: 'https://www.semiannual.com',
                easeRename_dcdmSuppProspectus: 'https://www.suppProspectus.com',
                easeRename_dcdmYearToDatePerformance: 20,
            }
        ];
        dummyResponse = data[id - 1];
        return of(dummyResponse);
    }

    getKtImage(): Observable<KakitanganImageModel> {
        return this.http.get<KakitanganImageModel>(`${this.fullPathEndPoint}/6`);
    }

    getSaveFundDetail(): Observable<ReturnRateConfigurationDetailModel[]> {
        return this.http.get<ReturnRateConfigurationDetailModel[]>(`${this.fullPathEndPoint}/returnRatesList`)
            .pipe(map((data: ReturnRateConfigurationDetailModel[]) => {
                //temporary fix - hide future CR items from production, remove if CR go live
                let details = data;
                if (environment.production == true && data) {
                    details = details.filter(type => type.section == 'Fund');
                    details.forEach(section => {
                        section.data = section.data.filter(data => data.type == 5);
                    });
                }
                return details;
            }));
    }

    updateSaveFundDetail(id: string | number, data: ReturnRateFormDetailModel): Observable<any> {
        let body: any = [];
        const columnKeys = Object.keys(data);

        columnKeys.forEach(
            columnKey => {
                body.push(this.constructFundSaveFundDetail(data[columnKey]));
            }
        );

        return this.http.put(`${this.fullPathEndPoint}/returnRatesList`, body);
    }

    uploadKtImg(data: FormData): Observable<any> {
        return this.http.put(`${this.fullPathEndPoint}/imageUpload`, data);
    }

    private constructFundSaveFundDetail(funds: ReturnRateSubDetail[]): ReturnRateApiWrapperModel {
        let fundData: ReturnRateApiWrapperModel = { settingsList: [] };
        funds.forEach(
            fund => {
                fundData.settingsList.push({
                    type: fund.type,
                    value: fund.value,
                });
            }
        );

        return fundData;
    }

}
