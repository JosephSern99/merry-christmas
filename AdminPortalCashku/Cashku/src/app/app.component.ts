import { Component } from '@angular/core';
import { NgbPaginationConfig, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { StorageService } from './core/services/storage.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  constructor(
    private storageService: StorageService,
    private paginationConfig: NgbPaginationConfig,
    private modalConfig: NgbModalConfig) {
  }

  title = 'template-web';

  ngOnInit() {
    this.initDevice();
    this.ngbConfig();
  }

  private initDevice() {
    if (!this.storageService.deviceId) {
      this.storageService.deviceId = Math.random().toString(36).substr(2);
    }
  }

  private ngbConfig() {
    this.paginationConfig.ellipses = false;
    this.paginationConfig.boundaryLinks = true;
    this.paginationConfig.rotate = true;
    this.paginationConfig.maxSize = 5;

    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
  }
}
