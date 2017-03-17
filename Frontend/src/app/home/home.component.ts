import { Component, Input } from '@angular/core';
import { ScoreListComponent } from '../score/score-list.component';

@Component({
  moduleId: module.id,
  templateUrl: 'templates/home.component.html'
})
export class HomeComponent {
  title: string = 'A new-style approach to old-skool gaming';
}
