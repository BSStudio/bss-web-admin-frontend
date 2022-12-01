import { MemberRemoveButtonComponent } from './member-remove-button.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { MemberModule } from '../../member.module';
import { Member } from '../../models/member.model';
import { MemberStatus } from '../../models/member-status.model';
import { Button, IconDirective } from 'carbon-components-angular';

describe('MemberRemoveButtonComponent', () => {
  beforeEach(() => MockBuilder(MemberRemoveButtonComponent, MemberModule));
  const member = new Member('id', 'url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, false);

  it('should create', () => {
    const fixture = MockRender(MemberRemoveButtonComponent, { member });
    expect(fixture.componentInstance.member).toEqual(member);

    const button = ngMocks.find('button');
    const buttonDirective = ngMocks.findInstance(button, Button);

    const span = ngMocks.find(button, 'span');
    expect(ngMocks.formatText(span)).toBe('Remove');

    const svg = ngMocks.find(button, 'svg.bx--btn__icon');
    const icon = ngMocks.findInstance(svg, IconDirective);
    expect(icon.ibmIcon).toBe('delete');
    expect(icon.size).toBe('16');
  });

  xit('should click', () => {});
});
