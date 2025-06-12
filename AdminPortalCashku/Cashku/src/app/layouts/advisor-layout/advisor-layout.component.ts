import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-advisor-layout',
    templateUrl: '../admin-layout/admin-layout.component.html',
    styleUrls: ['../admin-layout/admin-layout.component.scss'],
    standalone: false
})
export class AdvisorLayoutComponent implements OnInit {

    isSideNavOpen: boolean = true;

    @ViewChild('matSideNavContent') private matSideNavContent: MatSidenavContent;

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.router.events.subscribe(
            (events) => {
                if (events instanceof NavigationEnd) {
                    this.scrollTop();
                }
            }
        );
    }

    onCloseClick(sideNav: MatSidenav): void {
        sideNav.close();
        this.isSideNavOpen = false;
    }

    onOpenClick(sideNav: MatSidenav): void {
        sideNav.open();
        this.isSideNavOpen = true;
    }

    private scrollTop(): void {
        if (!this.matSideNavContent) {
            return;
        }

        this.matSideNavContent.getElementRef().nativeElement.scrollTop = 0;
    }
}
