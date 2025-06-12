import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdvisorLayoutComponent } from 'src/app/layouts/advisor-layout/advisor-layout.component';
import { VerifierLayoutComponent } from 'src/app/layouts/verifier-layout/verifier-layout.component';

import { AuthGuard } from 'src/app/core/services/guard/auth-guard';
import { RoleGuard } from 'src/app/core/services/guard/role-guard';

const routes: Routes = [
    // Default redirect to login
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },

    // Auth routes (login, register, etc.) - NO guards
    {
        path: '',
        component: AuthLayoutComponent,
        title: 'Auth Layout',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),
    },

    // Admin routes - protected
    {
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard],
        canLoad: [AuthGuard],
        component: AdminLayoutComponent,
        title: 'Admin Layout',
        data: { role: ['superadmin'] },
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    },

    // Advisor routes - protected
    {
        path: 'advisor',
        canActivate: [AuthGuard, RoleGuard],
        canLoad: [AuthGuard],
        component: AdvisorLayoutComponent,
        title: 'Advisor Layout',
        data: { role: ['admin'] },
        loadChildren: () => import('./layouts/advisor-layout/advisor-layout.module').then(m => m.AdvisorLayoutModule),
    },

    // Verifier routes - protected
    {
        path: 'verifier',
        canActivate: [AuthGuard, RoleGuard],
        canLoad: [AuthGuard],
        component: VerifierLayoutComponent,
        title: 'Verifier Layout',
        data: { role: ['verifier'] },
        loadChildren: () => import('./layouts/verifier-layout/verifier-layout.module').then(m => m.VerifierLayoutModule),
    },

    // Wildcard route - must be last
    {
        path: '**',
        redirectTo: '/login'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            paramsInheritanceStrategy: 'always',
            canceledNavigationResolution: 'computed',
            urlUpdateStrategy: 'eager',
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
