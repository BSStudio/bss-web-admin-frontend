import { Component } from '@angular/core'
import { MetricsComponent } from '../../components/metrics.component'

@Component({
  selector: 'app-index',
  standalone: true,
  template: `
    <h1 i18n>Welcome to the BSS video admin site!</h1>
    <app-metrics></app-metrics>
  `,
  imports: [MetricsComponent],
})
export class IndexComponent {}
