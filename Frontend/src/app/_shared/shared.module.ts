import { NgModule } from './index';
import * as s from './index';

@NgModule({
    imports: 
        [s.Ng2BootstrapModule, s.CommonModule],
    exports: 
        [s.MenuComponent, s.FilterPipe, s.ContentFilterPipe,
        s.PageNotFoundComponent, s.FooterComponent,
        s.AlertComponent,
        ],
    declarations: 
        [s.MenuComponent, s.FilterPipe,
        s.ContentFilterPipe, s.PageNotFoundComponent,
        s.FooterComponent, s.AlertComponent,],
    providers: 
        [s.AlertService, s.AuthGuard],
})
export class SharedModule { }
