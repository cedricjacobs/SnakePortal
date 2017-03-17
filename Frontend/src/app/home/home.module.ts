import { NgModule } from '@angular/core';
import * as h from './index';

@NgModule({
    imports: [h.SharedModule, h.ScoreModule, h.FormsModule, h.FeedModule, h.RouterModule],
    exports: [h.HomeComponent],
    declarations: [h.HomeComponent],
    providers: [],
})
export class HomeModule { }
