import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { AppVersion } from '@ionic-native/app-version';

@IonicPage()
@Component({
    selector: "page-info",
    templateUrl: "info.html"
})
export class InfoPage {

    protected version: any;
    protected name: string

    constructor(private appVersion: AppVersion) { }

    ionViewDidLoad(){
        this.appVersion.getVersionNumber().then(version => {
            this.version = version;
        });

        this.appVersion.getAppName().then(name => {
            this.name = name;
        });
    }
}
