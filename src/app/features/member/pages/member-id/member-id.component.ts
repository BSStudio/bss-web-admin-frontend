import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../models/member.model';
import { Subject } from 'rxjs';
import { MemberProfilePictureComponent } from '../../components/member-profile-picture/member-profile-picture.component';

@Component({
  selector: 'app-video-id',
  templateUrl: './member-id.component.html',
  styleUrls: ['./member-id.component.scss'],
})
export class MemberIdComponent implements OnDestroy {
  public member: Member;
  private readonly destroy$ = new Subject<boolean>();
  @ViewChild('picture', { static: true })
  public picture!: MemberProfilePictureComponent;

  constructor(private route: ActivatedRoute) {
    this.member = <Member>this.route.snapshot.data['member'];
  }

  updateImage() {
    this.picture.updateImage();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setMember(member: Member) {
    this.member = member;
  }
}
