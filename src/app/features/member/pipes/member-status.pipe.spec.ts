import { MemberStatusPipe } from './member-status.pipe';

describe('MemberStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new MemberStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
