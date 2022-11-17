import { MockBuilder, ngMocks } from 'ng-mocks';
import { MemberService } from './member.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { tap } from 'rxjs';
import { Member } from '../models/member.model';
import { MemberStatus } from '../models/member-status.model';
import { CreateMember } from '../models/create-member.model';
import { UpdateMember } from '../models/update-member.model';

describe('MemberService', () => {
  ngMocks.faster();
  beforeAll(() => MockBuilder([MemberService, HttpClientTestingModule]));

  const id = 'id';
  const member = new Member(id, 'url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, false);
  const createMember = new CreateMember('url', 'name');
  const updateMember = new UpdateMember('url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, false);

  it('should get all members', (done) => {
    const service = ngMocks.findInstance(MemberService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .getMembers()
      .pipe(tap((actual) => expect(actual).toEqual([member])))
      .subscribe({ complete: () => done() });

    const req = httpMock.expectOne('/api/v1/member');
    expect(req.request.method).toBe('GET');
    req.flush([member]);
    httpMock.verify();
  });

  it('should get a member', (done) => {
    const service = ngMocks.findInstance(MemberService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .getMember(id)
      .pipe(tap((actual) => expect(actual).toEqual(member)))
      .subscribe({ complete: () => done() });

    const req = httpMock.expectOne(`/api/v1/member/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(member);
    httpMock.verify();
  });

  it('should create a member', (done) => {
    const service = ngMocks.findInstance(MemberService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .createMember(createMember)
      .pipe(tap((actual) => expect(actual).toEqual(member)))
      .subscribe({ complete: () => done() });

    const req = httpMock.expectOne(`/api/v1/member`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(createMember);
    req.flush(member);
    httpMock.verify();
  });

  it('should update a member', (done) => {
    const service = ngMocks.findInstance(MemberService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .updateMember(id, updateMember)
      .pipe(tap((actual) => expect(actual).toEqual(member)))
      .subscribe({ complete: () => done() });

    const req = httpMock.expectOne(`/api/v1/member/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updateMember);
    req.flush(member);
    httpMock.verify();
  });

  it('should delete a member', (done) => {
    const service = ngMocks.findInstance(MemberService);
    const httpMock = ngMocks.findInstance(HttpTestingController);

    service
      .deleteMember(id)
      .pipe(tap((actual) => expect(actual).toEqual(member)))
      .subscribe({ complete: () => done() });

    const req = httpMock.expectOne(`/api/v1/member/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(member);
    httpMock.verify();
  });
});
