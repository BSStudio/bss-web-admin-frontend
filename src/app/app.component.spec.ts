import { AppComponent } from './app.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { AppModule } from './app.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Placeholder } from 'carbon-components-angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(() => MockBuilder([AppComponent, RouterModule, RouterTestingModule.withRoutes([])], AppModule));

  it('should create the app', () => {
    MockRender(AppComponent);
    expect(() => ngMocks.findInstance(RouterOutlet)).not.toThrow();
    expect(() => ngMocks.findInstance(Placeholder)).not.toThrow();
  });
});
