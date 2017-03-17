import { NgModule } from '@angular/core';
import * as u from './index'

@NgModule({
    imports: [u.UserRoutingModule, u.CommonModule, u.SharedModule, u.FormsModule,],
    exports: [],
    declarations: [u.LoginComponent, u.RegisterComponent],
    providers: [u.AuthenticationService, u.UserService],
})
export class UserModule { }
