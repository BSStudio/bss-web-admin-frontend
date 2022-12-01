import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { DefaultShellComponent } from './default-shell.component';
import { CoreModule } from '../../core.module';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

describe('DefaultShellComponent', () => {
  beforeEach(() => MockBuilder(DefaultShellComponent, CoreModule));

  it('should render', () => {
    MockRender(DefaultShellComponent);

    expect(() => ngMocks.find(HeaderComponent)).not.toThrow();
    const main = ngMocks.find('main#app');
    expect(() => ngMocks.find(main, RouterOutlet)).not.toThrow();
  });
});
