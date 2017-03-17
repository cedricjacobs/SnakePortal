import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Score } from '../_models/score';
import { PortalUserWithScores } from '../_models/portaluserwithscores';
import { Observable } from 'rxjs/Rx';

/**
 * to-do: error to alert service
 */

@Injectable()

export class ScoreService {

    constructor(private http: Http) { }

    private baseUrl = 'http://snakeportal.azurewebsites.net/api/'

    getAllPortalUsersWithScores(detailscores: boolean = true) {
        var url = this.baseUrl + 'portaluserwithscores?detailscores=' + detailscores

        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
    getSpecificPortalUserWithScores(id: number, detailscores: boolean = true)
        : Observable<PortalUserWithScores> {

        var url = this.baseUrl + 'portaluserwithscores/' + id + '?detailscores=' + detailscores

        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

}