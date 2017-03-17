import { Component } from '@angular/core';
import { MenuComponent } from './_shared/menu.component';
import { FooterComponent } from './_shared/footer.component';
import { FeedComponent } from './feed/feed.component';

@Component({
  moduleId: module.id,
  selector: 'SnakePortal',
  templateUrl: 'templates/app.component.html'
})
export class AppComponent { }
