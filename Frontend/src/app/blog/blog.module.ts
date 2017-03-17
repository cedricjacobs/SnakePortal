import { NgModule } from '@angular/core';
import * as b from './index'

@NgModule({
    imports: [b.CommonModule, b.BlogRoutingModule, b.SharedModule,],
    exports: [b.BlogListComponent],
    declarations: [b.BlogListComponent, b.BlogDetailViewComponent,b.BlogDetailEditComponent],
    providers: [b.BlogService],
})
export class BlogModule { }
