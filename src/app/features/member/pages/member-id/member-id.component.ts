import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../models/member.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-video-id',
  templateUrl: './member-id.component.html',
})
export class MemberIdComponent implements OnDestroy {
  public member: Member;
  public imgDate = new Date().getTime();
  private readonly destroy$ = new Subject<boolean>();
  constructor(private route: ActivatedRoute) {
    this.member = <Member>this.route.snapshot.data['member'];
  }

  updateImage() {
    this.imgDate = new Date().getTime();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setMember(member: Member) {
    this.member = member;
  }
}
