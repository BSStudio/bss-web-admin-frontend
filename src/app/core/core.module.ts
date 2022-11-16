import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultShellComponent } from './components/shell/default-shell.component';
import { HeaderComponent } from './components/header/header.component';
import { GridModule, I18n, IconService, UIShellModule } from 'carbon-components-angular';
// @ts-ignore
import { Renew16, View16, ViewOffFilled16 } from '@carbon/icons';

@NgModule({
  imports: [CommonModule, RouterModule, UIShellModule, GridModule],
  declarations: [DefaultShellComponent, HeaderComponent],
})
export class CoreModule {
  private static readonly icons = [Renew16, View16, ViewOffFilled16];
  private static readonly translations = {
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
    'CALENDAR.SHORTWEEKDAYS.MONDAY': 'H',
    'CALENDAR.SHORTWEEKDAYS.TUESDAY': 'K',
    'CALENDAR.SHORTWEEKDAYS.WEDNESDAY': 'Sze',
    'CALENDAR.SHORTWEEKDAYS.THURSDAY': 'Cs',
    'CALENDAR.SHORTWEEKDAYS.FRIDAY': 'P',
    'CALENDAR.SHORTWEEKDAYS.SATURDAY': 'Szo',
    'CALENDAR.SHORTWEEKDAYS.SUNDAY': 'V',
  };

  constructor(private iconService: IconService, private i18nService: I18n) {
    CoreModule.icons.forEach((icon) => this.iconService.register(icon));
    this.i18nService.setLocale('hu', CoreModule.translations);
  }
}
