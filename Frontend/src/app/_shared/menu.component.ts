import { Component, OnInit } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap';
import { Router } from '@angular/router'
/**
 * idea: create menuelems from list with properties so advanced authorisation is possible
 */

@Component({
    moduleId: module.id,
    selector: 'navmenu',
    templateUrl: 'templates/menu.component.html'
})
export class MenuComponent implements OnInit {
    public isCollapsed: boolean;
    constructor(private router: Router) { }
    
    ngOnInit() {
        this.isCollapsed = true;
    }
    
    navigateTo(path: string) {
        this.router.navigate([path]);
        this.isCollapsed = true;
    }
}