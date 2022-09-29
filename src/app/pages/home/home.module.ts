import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MetricsComponent } from '../../metrics/metrics.component';
import { TilesModule } from 'carbon-components-angular';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TilesModule],
  declarations: [HomeComponent, MetricsComponent],
})
export class HomeModule {}
