import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AlertService } from '../_shared/alert.service';
import { Location } from '@angular/common';

/**
 * Based on:  * http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 */

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'templates/register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private location: Location) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
    backClicked() {
        this.location.back();
    }
}
