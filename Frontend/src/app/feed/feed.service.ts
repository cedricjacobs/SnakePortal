import { Injectable } from '@angular/core';
import { FeedEntry } from "../_models/feedentry";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

/**
 * to-do: use alertservice for errors
 */

@Injectable()
export class FeedService {

    private baseUrl = 'http://snakeportal.azurewebsites.net/api/'
    blogposts: Array<FeedEntry> = new Array<FeedEntry>();
    constructor(
        private http: Http,
    ) {
    }

    public getAllFeedEntries() {
        var url = this.baseUrl + 'feedentries'
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);

    }
    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }

    getSpecificFeedEntries(id: number) {

        var url = this.baseUrl + 'feedentries/' + id

        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }
}