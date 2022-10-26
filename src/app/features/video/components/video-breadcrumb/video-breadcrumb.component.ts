import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-breadcrumb',
  template: `
    <ibm-breadcrumb [noTrailingSlash]="true">
      <ibm-breadcrumb-item i18n [route]="['video']" href="/video">Videos</ibm-breadcrumb-item>
      <ibm-breadcrumb-item i18n>{{ title }}</ibm-breadcrumb-item>
    </ibm-breadcrumb>
  `,
})
export class VideoBreadcrumbComponent {
  @Input() title!: string;
}
