import { MemberIdPictureComponent } from './member-id-picture.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { MemberModule } from '../../member.module';

describe('MemberIdPictureComponent', () => {
  beforeEach(() => MockBuilder(MemberIdPictureComponent, MemberModule));

  xit('should create', () => {
    const fixture = MockRender(MemberIdPictureComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
