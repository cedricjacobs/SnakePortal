import { Injectable } from '@angular/core';
import { BlogPost } from "../_models/blogpost";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

/**
 * to-do: use alertservice for errors
 */

@Injectable()
export class BlogService {

    private baseUrl = 'http://snakeportal.azurewebsites.net/api/'
    blogposts: Array<BlogPost> = new Array<BlogPost>();
    constructor(
        private http: Http,
    ) {
    }

    public getAllBlogPosts() {
        var url = this.baseUrl + 'blogposts'
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);

    }
    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }

    getSpecificBlogPost(id: number) {

        var url = this.baseUrl + 'blogposts/' + id

        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }
}