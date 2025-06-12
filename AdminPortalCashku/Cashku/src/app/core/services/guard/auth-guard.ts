import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, NavigationCancel, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable()
export class AuthGuard  {
    constructor(
        private router: Router,
        private storageService: StorageService
    ) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.hasAccessToken()) {
            this.router.events.subscribe((event) => {
                if (event instanceof NavigationCancel) {
                    this.storageService.pathHistory = event.url;
                }
            })
            this.router.navigate(['/login'])
        }
        return this.hasAccessToken();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.hasAccessToken();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.hasAccessToken();
    }

    private hasAccessToken(): boolean {
        return !!this.storageService.accessToken;
    }
}
