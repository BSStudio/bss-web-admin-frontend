import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { concatMap, from, map, Subject, takeUntil, tap, toArray } from 'rxjs';
import { VideoCrewService } from '../../services/video-crew.service';
import { MemberService } from '../../../member/services/member.service';
import { DetailedVideo } from '../../../video/models';
import { BaseModal } from 'carbon-components-angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CrewMember } from '../../models';

@Component({
  selector: 'app-video-crew-add-modal',
  templateUrl: './video-crew-add-modal.component.html',
})
export class VideoCrewAddModalComponent extends BaseModal implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<boolean>();
  public positions: string[] = [];
  public members: { name: string; id: string }[] = [];
  public form: FormGroup<{ memberId: FormControl<string>; position: FormControl<string> }>;

  constructor(
    private fb: FormBuilder,
    private service: VideoCrewService,
    private memberService: MemberService,
    @Inject('video') public video: DetailedVideo,
    @Inject('update') private update: EventEmitter<DetailedVideo>
  ) {
    super();
    this.form = this.fb.nonNullable.group({ memberId: '', position: '' });
  }

  ngOnInit() {
    this.updatePositions();
    this.updateMembers();
  }

  updatePositions() {
    this.service
      .getPositions()
      .pipe(
        tap((positions) => (this.positions = positions)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  updateMembers() {
    this.memberService
      .getMembers()
      .pipe(
        concatMap((members) => from(members)),
        map(({ id, name }) => ({ name, id })),
        toArray(),
        tap((members) => (this.members = members)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.addCrewMember(this.form.getRawValue());
    }
  }

  private addCrewMember(crewMember: CrewMember) {
    this.service
      .addVideoCrewMember({ videoId: this.video.id, ...crewMember })
      .pipe(
        tap((video) => this.update.emit(video)),
        tap(() => this.closeModal()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
