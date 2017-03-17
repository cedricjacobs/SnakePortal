import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoreDetailViewComponent } from './score-detail-view.component';
import { ScoreListComponent } from "./score-list.component";
import { AuthGuard } from '../_shared/auth.guard';
const scoreRoutes: Routes = [
/**
 * todo: fix routing bug for child routes
 */
  {
    path: "score",
    component: ScoreListComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "score/view/:userId",
    component: ScoreDetailViewComponent,
    canActivate:[AuthGuard]
  },

]


@NgModule({
  imports: [RouterModule.forChild(scoreRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class ScoreRoutingModule { }
