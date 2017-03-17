import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './_shared/page-not-found.component';
import { AuthGuard } from './_shared/auth.guard';
import { AboutComponent } from "./about/about.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    
  },
  {
    path: "home",
    redirectTo: "",
    pathMatch: 'full'
  },
  {
    path: "about",
    component: AboutComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
