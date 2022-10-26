import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './pages/home-routing.module';
import { HomeComponent } from './pages/index/home.component';
import { MetricsComponent } from './components/metrics.component';
import { TilesModule } from 'carbon-components-angular';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TilesModule],
  declarations: [HomeComponent, MetricsComponent],
})
export class HomeModule {}
