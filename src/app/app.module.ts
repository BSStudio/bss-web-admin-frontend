import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule, PlaceholderModule } from 'carbon-components-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './core/interceptors';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  providers: [httpInterceptorProviders],
  imports: [BrowserModule, AppRoutingModule, CoreModule, HttpClientModule, PlaceholderModule, NotificationModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
