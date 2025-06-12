import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../core/services/account.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
    standalone: false
})
export class AuthLayoutComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    // if (this.storageService.accessToken) {

    //   if (!this.accountService.userProfile) {

    //     //this.accountService.getProfile().subscribe();
    //   }
    // }
  }

  ngOnDestroy() {
  }
}
