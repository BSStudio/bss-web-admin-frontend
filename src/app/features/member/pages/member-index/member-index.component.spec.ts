import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { MemberIndexComponent } from './member-index.component';
import { MemberModule } from '../../member.module';
import { MemberTableComponent } from '../../components/member-table/member-table.component';

describe('MemberIndexComponent', () => {
  beforeEach(() => MockBuilder(MemberIndexComponent, MemberModule));

  it('should render', () => {
    MockRender(MemberIndexComponent);

    const h1 = ngMocks.find('h1');
    expect(ngMocks.formatText(h1)).toBe('Member manager');

    const p = ngMocks.find('article > p');
    expect(ngMocks.formatText(p)).toBe('A short description will be added here');

    ngMocks.findInstance(MemberTableComponent);
  });
});
