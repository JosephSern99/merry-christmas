import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { PagedResult } from '../../shared/models/paged-result/paged-result';

import { AccountService } from './account.service';
import { StorageService } from './storage.service';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})

export class GeneralService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private storageService: StorageService,
  ) { }

  //

  isShowSideMenu: boolean = false;

  //
  subMobileView = new BehaviorSubject(false);
  currMobileView = this.subMobileView.asObservable();

  setMobileView(isMobileView: boolean) {
    this.showSideMenu(!isMobileView);

    this.subMobileView.next(isMobileView);
  }

  //
  private showSideMenuSource = new Subject<any>();
  showSideMenuService$ = this.showSideMenuSource.asObservable();

  toggleSideMenu() {
    this.isShowSideMenu = !this.isShowSideMenu;

    this.showSideMenu(this.isShowSideMenu);
  }

  showSideMenu(show: boolean) {
    this.isShowSideMenu = show;

    this.showSideMenuSource.next(show);
  }
  //
}
