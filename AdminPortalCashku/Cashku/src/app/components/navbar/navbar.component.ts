import {DatePipe, DecimalPipe, Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';

import { BlockUiService } from '../../shared/services/blockUi/block-ui.service';
import { PopupService } from '../../shared/services/popup/popup.service';
import { AccountService } from '../../core/services/account.service';
import { StorageService } from '../../core/services/storage.service';
import { GeneralService } from '../../core/services/general.service';
import {ClickOutsideDirective} from '../../shared/directive/click-outside.directive';

/**
 * @deprecated
 */
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    imports: [
        ClickOutsideDirective,
        RouterLink,
        DecimalPipe,
        DatePipe
    ],
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private blockUiService: BlockUiService,
    private popupService: PopupService,
    private accountService: AccountService,
    private storageService: StorageService,
    private generalService: GeneralService,
  ) { }

  //
  isShowDDProfile = false;
  userProfile: any;

  //
  ngOnInit() {
    this.accountService.currUserProfile.subscribe(data => {
      this.userProfile = data;
    });
  }

  //
  goLogout() {
    this.blockUiService.open();

    this.accountService.logout()
      .subscribe(() => {
        this.popupService.alert("Succesfully Logged Out")

        this.router.navigate(['login']);
      }, (err) => {
        if (err.errorMessage) {
          this.popupService.alert(err.errorMessage);
        } else {
          this.popupService.alert(err.ErrorMessage);
        }
      })
      .add(() => {
        this.blockUiService.close();
      });
  }

  //
  toggleSideMenu() {
    this.generalService.toggleSideMenu();
  }

  toggleDDProfile() {
    this.isShowDDProfile = !this.isShowDDProfile;
  }
  //
}
