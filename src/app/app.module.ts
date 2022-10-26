import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// @ts-ignore
import { Renew16, View16, ViewOffFilled16 } from '@carbon/icons';
import { I18n, IconService, NotificationModule, PlaceholderModule } from 'carbon-components-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './core/components/shell/shell.module';
import { httpInterceptorProviders } from './core/interceptors';

@NgModule({
  declarations: [AppComponent],
  providers: [httpInterceptorProviders],
  imports: [BrowserModule, AppRoutingModule, ShellModule, HttpClientModule, PlaceholderModule, NotificationModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  private static readonly icons = [Renew16, View16, ViewOffFilled16];

  constructor(private iconService: IconService, private i18nService: I18n) {
    AppModule.icons.forEach((icon) => this.iconService.register(icon));
    this.i18nService.setLocale('hu', {
      'CALENDAR.MONTHS.JANUARY': 'Január',
      'CALENDAR.MONTHS.FEBRUARY': 'Február',
      'CALENDAR.MONTHS.MARCH': 'Március',
      'CALENDAR.MONTHS.APRIL': 'Április',
      'CALENDAR.MONTHS.MAY': 'Május',
      'CALENDAR.MONTHS.JUNE': 'Június',
      'CALENDAR.MONTHS.JULY': 'Július',
      'CALENDAR.MONTHS.AUGUST': 'Augusztus',
      'CALENDAR.MONTHS.SEPTEMBER': 'Szeptember',
      'CALENDAR.MONTHS.OCTOBER': 'Október',
      'CALENDAR.MONTHS.NOVEMBER': 'November',
      'CALENDAR.MONTHS.DECEMBER': 'December',
      'CALENDAR.SHORTWEEKDAYS.SUNDAY': 'V',
      'CALENDAR.SHORTWEEKDAYS.MONDAY': 'H',
      'CALENDAR.SHORTWEEKDAYS.TUESDAY': 'K',
      'CALENDAR.SHORTWEEKDAYS.WEDNESDAY': 'Sze',
      'CALENDAR.SHORTWEEKDAYS.THURSDAY': 'Cs',
      'CALENDAR.SHORTWEEKDAYS.FRIDAY': 'P',
      'CALENDAR.SHORTWEEKDAYS.SATURDAY': 'Szo',
    });
  }
}
