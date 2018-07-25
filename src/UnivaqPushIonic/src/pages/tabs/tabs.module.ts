import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SuperTabsModule } from "ionic2-super-tabs";

import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    SuperTabsModule,
    TranslateModule.forChild()
  ],
})
export class TabsPageModule { }
