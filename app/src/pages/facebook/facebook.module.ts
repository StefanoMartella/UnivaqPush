import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TruncateModule } from "@yellowspot/ng-truncate";

import { FacebookPage } from './facebook';

@NgModule({
    declarations: [
        FacebookPage,
    ],
    imports: [
        IonicPageModule.forChild(FacebookPage),
        TranslateModule.forChild(),
        TruncateModule 
    ],
})
export class FacebookPageModule { }
