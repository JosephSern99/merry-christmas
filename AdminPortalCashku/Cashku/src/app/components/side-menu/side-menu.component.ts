import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BlockUiService } from '../../shared/services/blockUi/block-ui.service';
import { PopupService } from '../../shared/services/popup/popup.service';
import { StorageService } from '../../core/services/storage.service';
import { GeneralService } from '../../core/services/general.service';
import { AccountService } from '../../core/services/account.service';

/**
 * @deprecated
 */
@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    imports: [
        RouterLink
    ],
    styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit {

    constructor(
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private popupService: PopupService,
        private blockUiService: BlockUiService,
        private storageService: StorageService,
        private generalService: GeneralService,
        private accountService: AccountService,
    ) { }

    //
    menuList = [
        {
            moduleName: "Dashboard",
            moduleIcon: "../../../assets/images/dashboard_white@2x.png",
            route: "/dashboard",
            external: false,
        },
        {
            moduleName: "Portfolio Management",
            moduleIcon: "../../../assets/images/customer_white@2x.png",
            route: "/portfolio-management",
            external: false,
        },
        {
            moduleName: "Customer List",
            moduleIcon: "../../../assets/images/customer_white@2x.png",
            route: "/customer-list",
            external: false,
        },
        {
            moduleName: "Advisor List",
            moduleIcon: "../../../assets/images/advisor_white@2x.png",
            route: "/advisor-list",
            external: false,
        },{
            moduleName: "Portfolio Management",
            moduleIcon: "../../../assets/images/customer_white@2x.png",
            route: "/portfolio-management",
            external: false,
        },
        {
            moduleName: "Customer List",
            moduleIcon: "../../../assets/images/customer_white@2x.png",
            route: "/customer-list",
            external: false,
        },
        {
            moduleName: "Advisor List",
            moduleIcon: "../../../assets/images/advisor_white@2x.png",
            route: "/advisor-list",
            external: false,
        },
    ]

    //
    subscribeAlive = true;
    isShowSideMenu = true;

    isMobileView = false;

    userProfile: any;

    ipayPaymentMethod: any;


    //
    ngOnInit() {

        //---subscribe to service
        this.generalService.showSideMenuService$.pipe(takeWhile(() => this.subscribeAlive)).subscribe(data => {
            this.isShowSideMenu = data;
        });

        this.generalService.currMobileView.subscribe(data => {
            this.isMobileView = data;
        });

        this.accountService.currUserProfile.subscribe(data => {
            this.userProfile = data;
        });
        //---

    }

    ngOnDestroy() {
        this.subscribeAlive = false;
    }


}
