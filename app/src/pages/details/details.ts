import { Component } from '@angular/core';
import { SocialSharing } from "@ionic-native/social-sharing";
import { IonicPage, NavParams } from 'ionic-angular';

import { News } from '../../model/news.model';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  protected news: News;

  constructor(
    private params: NavParams,
    private socialSharing: SocialSharing) {
      
    this.news = this.params.data;
  }

  share(news): void {
    let sharableNews = news.sharableVersion();
    this.socialSharing.share(sharableNews).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

}
