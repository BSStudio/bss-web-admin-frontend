import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'carbon-components-angular';

@Component({
  selector: 'app-index',
  template: `
    <h1 i18n>Welcome to the BSS video admin site!</h1>
    <app-metrics></app-metrics>
  `,
})
export class IndexComponent implements OnInit {
  constructor(private service: NotificationService) {}

  ngOnInit(): void {
    this.service.showToast({ type: 'alert', title: 'Toast' });
  }
}
