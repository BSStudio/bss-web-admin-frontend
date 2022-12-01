import { VideoCrewAddModalComponent } from './video-crew-add-modal.component';
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { VideoCrewModule } from '../../video-crew.module';
import { FormBuilder } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DetailedVideo } from '../../../video/models';
import { VideoCrewService } from '../../services/video-crew.service';
import { of } from 'rxjs';
import { MemberService } from '../../../member/services/member.service';
import { Member } from '../../../member/models/member.model';
import { MemberStatus } from '../../../member/models/member-status.model';

describe('VideoCrewAddModalComponent', () => {
  const positions = ['position'];
  const members: Member[] = [
    new Member('id', 'url', 'name', 'description', 'joinedAt', 'role', MemberStatus.ALUMNI, true),
  ];
  const detailedVideo = new DetailedVideo('id', 'url', 'title', 'description', 'uploadedAt', true, []);
  const eventEmitter = new EventEmitter<DetailedVideo>();
  beforeEach(() =>
    MockBuilder([VideoCrewAddModalComponent, FormBuilder], VideoCrewModule)
      .provide({ provide: 'video', useFactory: () => detailedVideo })
      .provide({ provide: 'update', useFactory: () => eventEmitter })
  );

  it('should create', () => {
    MockInstance(VideoCrewService, 'getPositions', () => of(positions));
    MockInstance(MemberService, 'getMembers', () => of(members));
    const fixture = MockRender(VideoCrewAddModalComponent);

    expect(fixture.point.componentInstance.video).toEqual(detailedVideo);
    expect(fixture.point.componentInstance['update']).toEqual(eventEmitter);
  });
});
