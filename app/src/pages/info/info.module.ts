import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { InfoPage } from './info';

@NgModule({
    declarations: [
        InfoPage,
    ],
    imports: [
        IonicPageModule.forChild(InfoPage),
        TranslateModule.forChild()
    ],
})
export class AdsuPageModule { }
