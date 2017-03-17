import { Component, OnInit } from '@angular/core';
import { ScoreService } from './score.service';
import { PortalUserWithScores } from '../_models/portaluserwithscores';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'scoredetailview',
    templateUrl: 'templates/score-detail-view.component.html'
})
export class ScoreDetailViewComponent implements OnInit {
    title: string;
    user: PortalUserWithScores;
    errorMessage: any;
    constructor(private scoreService: ScoreService, private activatedRoute: ActivatedRoute
        , private router: Router, private location:Location) {
    }

    ngOnInit() {
        this.title = "Details per user"
        var id = +this.activatedRoute.snapshot.params["userId"];
        var s = null;
        if (id) {
            s = this.scoreService.getSpecificPortalUserWithScores(id, true);
            s.subscribe(
                data => this.user = data, error => this.errorMessage = <any>error);
        }
        else {
            console.log("Invalid id. Routing home...")
            this.router.navigate(['']);
        }

    }
    goBack() {
        this.location.back();
    }
}