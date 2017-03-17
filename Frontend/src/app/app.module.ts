import { NgModule } from './index';
import * as app from './index';
import { fakeBackendProvider } from './_helper/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

@NgModule({
  imports: [app.BrowserModule, app.FormsModule,
  app.HttpModule,
  //remember: routing modules before app.routing
  app.UserModule, app.ScoreModule,
  app.HomeModule, app.FeedModule,
  app.AboutModule, app.BlogModule,
  app.SharedModule, app.AppRoutingModule],
  declarations: [app.AppComponent],
  bootstrap: [app.AppComponent],
  providers: [
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions]
})
export class AppModule { }
