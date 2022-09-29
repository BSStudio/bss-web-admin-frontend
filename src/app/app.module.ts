import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { HttpClientModule } from '@angular/common/http';
import { IconModule, PlaceholderModule } from 'carbon-components-angular';
import { httpInterceptorProviders } from './interceptor';

@NgModule({
  declarations: [AppComponent],
  providers: [httpInterceptorProviders],
  imports: [BrowserModule, AppRoutingModule, ShellModule, HttpClientModule, IconModule, PlaceholderModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
