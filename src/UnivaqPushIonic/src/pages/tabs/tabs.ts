import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, Searchbar, Platform } from 'ionic-angular';

import { HOME_PAGE, SECRETARY_PAGE, ADSU_PAGE, CANTEEN_PAGE } from '../pages';

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {

  @ViewChild("searchbar") private searchBar: Searchbar;

  protected mySelectedIndex: number;

  private search: string;
  private toggled: boolean = false;
  protected title: string = 'NEWS';

  protected newsTab: any = HOME_PAGE;
  protected secretaryTab: any = SECRETARY_PAGE;
  protected adsuTab: any = ADSU_PAGE;
  protected canteenTab: any = CANTEEN_PAGE;

  constructor(
    private events: Events,
    private platform: Platform) 
  { }

  onTabSelect(event){
    // Using event.title doesn't work 
    // don't know why so we use event.id
    switch(event.id){
      case "NEWS": this.title = event.id; 
                   break;

      default:     this.title = event.id;
                   this.leaveHome();
    }
  }

  // Closing searchbar and removing search icon
  leaveHome(){
    this.toggled = false;
    this.closeSearch();
  }

  // Function to display searchbar 
  public toggle(): void {
    // In IOS searchar is animated
    if (this.platform.is('ios')) {
      setTimeout(() => {
        this.toggled = this.toggled ? false : true;
        if (this.toggled) {
          setTimeout(() => {
            this.searchBar.setFocus();
          }, 150);
        }
      }, 250);
    }
    else {
      this.toggled = this.toggled ? false : true;
      if (this.toggled) {
        setTimeout(() => {
          this.searchBar.setFocus();
        }, 150);
      }
    }
  }

  // Publish news-research event that will be intercepted by
  // home page that will use the word to filter the news
  searchNews() {
    this.events.publish("news-research", this.search);
  }

  // Publish close-search event that will be intercepted by
  // home page that will use restore the news from fixed list(view home page)
  closeSearch() {
    this.search = "";
    this.events.publish("close-search");
  }
}
