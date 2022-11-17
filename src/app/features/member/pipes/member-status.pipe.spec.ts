import { MemberStatusPipe } from './member-status.pipe';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { MemberStatus } from '../models/member-status.model';

describe('MemberStatusPipe', () => {
  ngMocks.faster();
  beforeAll(() => MockBuilder(MemberStatusPipe));
  it('should map MEMBER', () => {
    const fixture = MockRender(MemberStatusPipe, {
      $implicit: MemberStatus.MEMBER,
    });
    expect(fixture.nativeElement.innerHTML).toBe('Member');
  });
  it('should map ACTIVE_ALUMNI', () => {
    const fixture = MockRender(MemberStatusPipe, {
      $implicit: MemberStatus.ACTIVE_ALUMNI,
    });
    expect(fixture.nativeElement.innerHTML).toBe('Active alumni');
  });
  it('should map MEMBER_CANDIDATE', () => {
    const fixture = MockRender(MemberStatusPipe, {
      $implicit: MemberStatus.MEMBER_CANDIDATE,
    });
    expect(fixture.nativeElement.innerHTML).toBe('Member candidate');
  });
  it('should map ALUMNI', () => {
    const fixture = MockRender(MemberStatusPipe, {
      $implicit: MemberStatus.ALUMNI,
    });
    expect(fixture.nativeElement.innerHTML).toBe('Alumni');
  });
  it('should map MEMBER_CANDIDATE_CANDIDATE', () => {
    const fixture = MockRender(MemberStatusPipe, {
      $implicit: MemberStatus.MEMBER_CANDIDATE_CANDIDATE,
    });
    expect(fixture.nativeElement.innerHTML).toBe('Member candidate candidate');
  });
});
