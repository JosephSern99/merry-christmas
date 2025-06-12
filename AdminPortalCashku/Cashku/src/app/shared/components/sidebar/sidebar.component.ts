import { APP_VERSION } from 'src/app/core/constants/app.constants';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SidebarMenu } from './sidebar.model';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
})
export class SidebarComponent implements OnInit {

    APP_VERSION = APP_VERSION;
    isProduction: boolean = environment.production === true;
    menus: SidebarMenu[] = [];

    constructor(
        private router: Router,
        private storageService: StorageService,
    ) { }

    ngOnInit(): void {
        this.constcuctMenus(this.storageService.roles)
    }

    isActiveMenu(menuItem: SidebarMenu): boolean {
        let currentRoute = this.router.url;
        if (currentRoute.indexOf(menuItem.url) > -1) {
            return true;
        }

        return false;
    }

    private constcuctMenus(role: string): void {
        if (role === 'superadmin') {
            this.menus = [
                { name: 'Dashboard', url: '/dashboard', icon: '/assets/images/dashboard_white@2x.png' },
                { name: 'Portfolio Management', url: '/portfolio-management', icon: '/assets/images/portfolio_white@2x.png' },
                { name: 'Fees Management', url: '/fees-management', icon: '/assets/images/fee_white@2x.png' },
                { name: 'Data Configuration', url: '/data-configuration', icon: '/assets/images/data_configuration_white@2x.png' },
                { name: 'Client List', url: '/customer', icon: '/assets/images/customer_white@2x.png' },
                { name: 'Advisor List', url: '/advisor', icon: '/assets/images/advisor_white@2x.png' },
                { name: 'Partner Referral List', url: '/referral', icon: '/assets/images/referral_list_white@2x.png' },
                // { name: 'Passport Verification', url: '/passport', icon: '/assets/images/passport_white@2x.png' },
                { name: 'Reports', url: '/report', icon: '/assets/images/reports_white@2x.png' },
                { name: 'Audit Trail', url: '/audit', icon: '/assets/images/audit_trail_white@2x.png' },
                // { name: 'Notification', url: '/notification', icon: '/assets/images/notification_white@2x.png' },
            ];
        } else if (role === 'admin') {
            this.menus = [
                { name: 'My Client', url: '/advisor-customer', icon: '/assets/images/customer_white@2x.png' },
                { name: 'Advisor Notes', url: '/advisor-planner-notes', icon: '/assets/images/note_white@2x.png' },
                { name: 'Internal Notes', url: '/advisor-internal-notes', icon: '/assets/images/internal_note_white_icon@2x.png' },
                { name: 'Withdrawals', url: '/withdrawals', icon: '/assets/images/withdrawal_white@2x.png' },
            ];
        } else if (role === 'verifier') {
            this.menus = [
                { name: 'Reports', url: 'verifier-report', icon: '/assets/images/reports_white@2x.png' },
                // { name: 'Recurring Payments', url: 'verifier-recurring-payment', icon: '/assets/images/icon_recurring_payment@2x.png' }
            ];
        }

    }

}
