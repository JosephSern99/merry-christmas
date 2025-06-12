import {ActivatedRoute, Route, RouterModule} from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

/**
 * This component will take "title" data in Route as label.
 */
@Component({
    selector: 'app-listing-popup-breadcrumb',
    templateUrl: './listing-popup-breadcrumb.component.html',
    styleUrls: ['./listing-popup-breadcrumb.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
})
export class ListingPopupBreadcrumbComponent implements OnInit {

    @Input() icon: string = '/assets/images/icon_people@2x.png';
    @Input() replace: { [key: string]: string };

    uiBreadcrumbs: UiBreadcrumb[] = [];

    private foundPaths: Route[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.generatePathLayer();
        this.generateUiData();
    }

    private generatePathLayer(): void {
        if (this.activatedRoute.parent.routeConfig.path === '') {
            this.foundPaths.unshift(this.activatedRoute.routeConfig);
            return;
        }

        let currentPath: string = this.activatedRoute.routeConfig.path;

        while (currentPath) {
            let foundRoute: Route = this.activatedRoute.parent.routeConfig.children.find(
                (route) => {
                    return route.path === currentPath;
                }
            );

            if (foundRoute.component) {
                this.foundPaths.unshift(foundRoute);
            }

            currentPath = currentPath.split('/').slice(0, -1).join('/');
        }

        this.foundPaths.unshift(this.activatedRoute.parent.routeConfig);
    }

    private generateUiData(): void {
        for (let i = 0; i < this.foundPaths.length; i++) {
            this.uiBreadcrumbs.push(
                {
                    path: Array(this.foundPaths.length - 1 - i).fill('..').join('/'),
                    title: this.replaceTitle(this.foundPaths[i].data?.title),
                }
            );
        }
    }

    private replaceTitle(routeTitle: string): string {
        routeTitle = routeTitle ?? 'Default Bread';
        if (!this.replace) {
            return routeTitle;
        }

        Object.keys(this.replace).forEach(key => {
            routeTitle = routeTitle.replace(`{{${key}}}`, this.replace[key]);
        });
        return routeTitle;
    }

}

export interface UiBreadcrumb {
    path: string;
    title: string
}
