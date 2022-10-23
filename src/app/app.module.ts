import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { SharedModule } from './@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { IconService, PlaceholderModule } from 'carbon-components-angular';
import { httpInterceptorProviders } from './interceptor';
// @ts-ignore
import { Renew16, View16, ViewOffFilled16 } from '@carbon/icons';

@NgModule({
  declarations: [AppComponent],
  providers: [httpInterceptorProviders],
  imports: [BrowserModule, AppRoutingModule, ShellModule, HttpClientModule, PlaceholderModule, SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconService: IconService) {
    this.iconService.register(Renew16);
    this.iconService.register(View16);
    this.iconService.register(ViewOffFilled16);
  }
}
