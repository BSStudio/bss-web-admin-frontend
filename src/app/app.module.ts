import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule, PlaceholderModule } from 'carbon-components-angular';
import { ROUTES } from './routes';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './core/interceptors';
import { CoreModule } from './core/core.module';
import { PreloadAllModules, RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  providers: [httpInterceptorProviders],
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
