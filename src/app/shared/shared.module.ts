import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'carbon-components-angular';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BooleanPipe } from './pipes/boolean.pipe';

@NgModule({
  imports: [CommonModule, BreadcrumbModule],
  declarations: [BreadcrumbComponent],
  providers: [BooleanPipe],
  exports: [BreadcrumbComponent],
})
export class SharedModule {}
