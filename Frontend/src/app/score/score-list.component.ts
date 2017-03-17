import { Component, OnInit, Input } from '@angular/core';
import { ScoreService } from './score.service';
import { PortalUserWithScores } from '../_models/portaluserwithscores';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'scorelist',
    templateUrl: 'templates/score-list.component.html',
})
export class ScoreListComponent implements OnInit {
    constructor(private scoreService: ScoreService, private router: Router) { }
    filter: string = '';
    @Input() scoredetails: boolean = false;
    scores: Array<PortalUserWithScores>;
    selectedUser: PortalUserWithScores;
    errorMessage: string;
    title: string;
    ngOnInit() {
        let s = null;
        this.title = "All-time High Scores"
        s = this.scoreService.getAllPortalUsersWithScores(this.scoredetails);
        s.subscribe(
            scores => this.scores = scores, error => this.errorMessage = <any>error
        );
        
    }
    onSelect(user: PortalUserWithScores) {
        this.selectedUser = user;
        this.router.navigate(["score/view", this.selectedUser.Id]);
    }

}