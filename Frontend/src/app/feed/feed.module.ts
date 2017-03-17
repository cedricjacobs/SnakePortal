import { NgModule } from '@angular/core';
import * as f from './index';


@NgModule({
    imports: [f.CommonModule],
    exports: [f.FeedComponent],
    declarations: [f.FeedComponent],
    providers: [f.FeedService],
})
export class FeedModule { }
