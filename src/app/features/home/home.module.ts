import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './pages/home-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { MetricsComponent } from './components/metrics.component';
import { NotificationModule, TilesModule } from 'carbon-components-angular';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TilesModule, NotificationModule],
  declarations: [IndexComponent, MetricsComponent],
})
export class HomeModule {}
