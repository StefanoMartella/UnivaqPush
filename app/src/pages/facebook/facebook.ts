import { Component } from '@angular/core';
import { IonicPage } from "ionic-angular";
import { FacebookService } from './../../services/facebook.service';

import { Observable } from 'rxjs/Rx';
import { ENV } from "@app/env";
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: "page-facebook",
  templateUrl: "facebook.html"
})
export class FacebookPage {

  // To truncate long posts
  protected limit: number = ENV.POST_MAX_LENGTH;

  protected posts: Observable<any[]>;

  constructor(private facebookService: FacebookService) {
    this.getPosts();
  }

  getPosts(): void {
    this.posts = this.facebookService
      .getPosts()
      .map(data => data.map(this.mapPosts));
  }

  mapPosts = post => {
    return {
      from: post.from,
      time: post.created_time * 1000, // convert to milliseconds
      message: post.message,
      url: post.id,
      photos: this.getPhotos(post),
      truncating: post.message.length > this.limit ? true : undefined  
    };
  };

  getPhotos = post => {
    if (!post.attachments) return [];

    let attachments =
      post.attachments.data[0].subattachments || post.attachments;

    return attachments.data
      .filter(x => x.type == "photo")
      .map(x => x.media.image);
  };

  refreshPosts(refresher): void {
    setTimeout(() => {
      this.getPosts();
      refresher.complete();
    }, 200);
  }
}