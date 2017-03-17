import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

const userRoutes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    }

]
@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class UserRoutingModule { }
