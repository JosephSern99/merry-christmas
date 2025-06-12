import { SettingType } from 'src/app/core/constants/data-config.constants';
import { DetailInterface, ListingDataInterface } from 'src/app/pages/admin/listing-popup/base-listing.model';

export class DataConfigListModel implements ListingDataInterface {
    easeRename_dclmFundName: string;
    easeRename_dclmId: string;
    index: number;
}

export class DocumentationsConfigurationDetailModel implements DetailInterface {
    easeRename_dcdmAnnualReport: string;
    easeRename_dcdmFundFactsheet: string;
    easeRename_dcdmFundName: string;
    easeRename_dcdmHighlightSheet: string;
    easeRename_dcdmId: string;
    easeRename_dcdmReturnHistory: {
        y1: number,
        y2: number,
        y3: number,
        y5: number,
    };
    easeRename_dcdmMemorandum: string;
    easeRename_dcdmSemiAnnualReport: string;
    easeRename_dcdmSuppProspectus: string;
    easeRename_dcdmYearToDatePerformance: number;

}

export class ReturnRateConfigurationDetailModel implements DetailInterface {
    data: ReturnRateSubDetail[];
    section: string;
}

export class ReturnRateSubDetail {
    title: string;
    type: SettingType;
    value: string;
}

export interface ReturnRateFormDetailModel {
    [key: string]: ReturnRateSubDetail[];
}

export interface ReturnRateApiWrapperModel {
    settingsList: {
        type: SettingType;
        value: string;
    }[];
}

export interface KakitanganImageModel {
    value: string;
}
