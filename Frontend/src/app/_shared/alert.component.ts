import { Component, OnInit } from '@angular/core';
import { AlertService } from './index';
 
@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'templates/alert.component.html'
})

/**
 * Based on:  * http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 * to-do: include transition so message disappears after x seconds and alert dismissable on-the-fly
 */
 
export class AlertComponent {
    message: any;
 
    constructor(private alertService: AlertService) { }
 
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}