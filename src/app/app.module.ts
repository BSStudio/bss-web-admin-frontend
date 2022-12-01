import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NotificationModule, PlaceholderModule } from 'carbon-components-angular'
import { ROUTES } from './routes'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { PreloadAllModules, RouterModule } from '@angular/router'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
    CoreModule,
    HttpClientModule,
    PlaceholderModule,
    NotificationModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
