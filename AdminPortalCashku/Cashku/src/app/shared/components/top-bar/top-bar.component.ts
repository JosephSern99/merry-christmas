import { AccountService } from 'src/app/core/services/account.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserType } from 'src/app/core/constants/user.constants';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
    standalone: false
})
export class TopBarComponent implements OnInit {

    role: string;
    UserType = UserType;

    constructor(
        private storageService: StorageService,
        private accountService: AccountService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.role = UserType[this.storageService.roles].label.toLowerCase();
    }

    getName(): string {
        return this.storageService.fullname;
    }

    logOut() {
        this.accountService
            .logout()
            .pipe(finalize(() => this.router.navigate(['/login'])))
            .subscribe();
    }
}
