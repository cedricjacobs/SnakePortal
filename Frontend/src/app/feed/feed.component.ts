import { Component, OnInit } from '@angular/core';
import { FeedEntry } from '../_models/feedentry';
import { FeedService } from './feed.service';

/**
 * 
 */
@Component({
    moduleId: module.id,
    selector: 'feed',
    templateUrl: 'templates/feed.component.html'
})

export class FeedComponent implements OnInit {
        errorMessage: any;
    constructor(private feedservice:FeedService) { }

    feedEntries:Array<FeedEntry>=null;


    ngOnInit() {
        var s =this.feedservice.getAllFeedEntries();
        s.subscribe(posts=>this.feedEntries=posts, error =>this.errorMessage = <any>error);
     }
}