import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-breadcrumb[name]',
  template: `
    <ibm-breadcrumb [noTrailingSlash]="true">
      <ibm-breadcrumb-item i18n [route]="['member']" href="/member">Members</ibm-breadcrumb-item>
      <ibm-breadcrumb-item>{{ name }}</ibm-breadcrumb-item>
    </ibm-breadcrumb>
  `,
})
export class MemberBreadcrumbComponent {
  @Input() name = '';
}
