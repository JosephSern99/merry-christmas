import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard  {
    private routeMap = {
        superadmin: '/dashboard',
        admin: '/advisor-customer',
        verifier: '/verifier-report',
    }

    constructor(private storageService: StorageService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let role = route.data.role as string[];
        const verifiedRole = this.storageService.roles; // set when logged in

        if (!role.includes(verifiedRole)) {
            this.router.navigate([this.routeMap[verifiedRole]]);
            return false;
        }

        return true;
    }
}
