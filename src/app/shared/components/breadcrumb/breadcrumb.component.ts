import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <ibm-breadcrumb [noTrailingSlash]="true">
      <ibm-breadcrumb-item [route]="[route]" href="/{{ route }}">{{ routeName }}</ibm-breadcrumb-item>
      <ibm-breadcrumb-item>{{ title }}</ibm-breadcrumb-item>
    </ibm-breadcrumb>
  `,
})
export class BreadcrumbComponent {
  @Input() title = '';
  @Input() route = '';
  @Input() routeName = '';
}
