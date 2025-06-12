import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'agmo-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: false
})
export class LoaderComponent implements OnInit {
  public displayLoader = false;

  constructor() { }

  ngOnInit() {
    }
}
