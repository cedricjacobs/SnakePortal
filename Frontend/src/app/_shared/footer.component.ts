import { Component, OnInit } from '@angular/core';

/**
 * To-do: decide whether to integrate in main template if static 
 */

@Component({
    moduleId: module.id,
    selector: 'navfooter',
    templateUrl: 'templates/footer.component.html'
})
export class FooterComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}