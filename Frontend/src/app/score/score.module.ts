import { NgModule } from './index';
import * as s from './index';


@NgModule({
    imports: [s.CommonModule, s.SharedModule, s.ScoreRoutingModule, s.FormsModule],
    exports: [s.ScoreListComponent],
    declarations: [s.ScoreListComponent, s.ScoreDetailViewComponent],
    providers: [s.ScoreService],
})
export class ScoreModule { }
