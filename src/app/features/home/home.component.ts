import { Component } from '@angular/core'
import { MetricsComponent } from './components/metrics.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MetricsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected readonly todo = ''
}
