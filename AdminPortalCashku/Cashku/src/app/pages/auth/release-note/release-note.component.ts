import { APP_VERSION } from 'src/app/core/constants/app.constants';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-release-note',
    templateUrl: './release-note.component.html',
    styleUrls: ['./release-note.component.scss'],
    standalone: false
})
export class ReleaseNoteComponent implements OnInit {

    APP_VERSION = APP_VERSION;

    constructor() { }

    ngOnInit(): void { }

}
