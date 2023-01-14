import { NgModule } from '@angular/core'
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component'
import { BooleanPipe } from './pipes/boolean.pipe'
import { ToastContentRoutedComponent } from './components/toast-content-routed/toast-content-routed.component'
import { LinkModule, NotificationModule } from 'carbon-components-angular'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [CommonModule, BreadcrumbComponent, BooleanPipe, NotificationModule, RouterModule, LinkModule],
  providers: [BooleanPipe],
  exports: [BreadcrumbComponent, ToastContentRoutedComponent],
  declarations: [ToastContentRoutedComponent],
})
export class SharedModule {}
