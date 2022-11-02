import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-breadcrumb',
  template: `
    <ibm-breadcrumb [noTrailingSlash]="true">
      <ibm-breadcrumb-item i18n [route]="['event']" href="/event">Events</ibm-breadcrumb-item>
      <ibm-breadcrumb-item>{{ title }}</ibm-breadcrumb-item>
    </ibm-breadcrumb>
  `,
})
export class EventBreadcrumbComponent {
  @Input() title = '';
}
