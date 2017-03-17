import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list.component';
import { BlogDetailViewComponent } from './blog-detail-view.component';
import { BlogDetailEditComponent } from './blog-detail-edit.component';
import { AuthGuard } from "../_shared/index";

/**
 * to-do: fix routing so direct routing to children doesn't generate errors
 */

const blogRoutes: Routes = [

    {
        path: 'blog',
        children: [
            {
                path: '',
                component: BlogListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'list',
                redirectTo: "",
                pathMatch: 'full'
            },
            {
                path: 'view/:id',
                component: BlogDetailViewComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'edit/:id',
                component: BlogDetailEditComponent,
                canActivate: [AuthGuard]
            },
        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(blogRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class BlogRoutingModule { }
