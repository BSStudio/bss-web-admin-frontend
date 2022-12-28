import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core'
import { concatMap, from, map, Subject, takeUntil, tap, toArray } from 'rxjs'
import { VideoCrewService } from '../../services/video-crew.service'
import { MemberService } from '../../../member/services/member.service'
import { DetailedVideo } from '../../../video/models'
import { BaseModal, ListItem } from 'carbon-components-angular'
import { FormBuilder, Validators } from '@angular/forms'
import { DetailedCrewMember } from '../../models'

interface MemberListItem extends ListItem {
  id: string
}

@Component({
  selector: 'app-video-crew-add-modal',
  templateUrl: './video-crew-add-modal.component.html',
  styleUrls: ['./video-crew-add-modal.component.scss'],
})
export class VideoCrewAddModalComponent extends BaseModal implements OnInit, OnDestroy {
  @Output()
  public update = new EventEmitter<DetailedVideo>()

  private readonly destroy$ = new Subject<void>()
  public positions: string[] = []
  public members: MemberListItem[] = []

  public form = this.fb.group({
    position: this.fb.nonNullable.control('', [Validators.required]),
    member: this.fb.control<MemberListItem | null>(null, [Validators.required]),
  })

  constructor(
    private fb: FormBuilder,
    private service: VideoCrewService,
    private memberService: MemberService,
    @Inject('video') public video: DetailedVideo
  ) {
    super()
  }

  ngOnInit() {
    this.updatePositions()
    this.updateMembers()
  }

  get positionInvalidText(): string {
    const { position } = this.form.controls
    if (position.touched && position.errors && position.errors['required']) {
      return $localize`Required field`
    }
    return ''
  }

  private updatePositions() {
    this.service
      .getPositions()
      .pipe(
        tap((positions) => (this.positions = positions)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private updateMembers() {
    this.memberService
      .getMembers()
      .pipe(
        concatMap((members) => from(members)),
        map(({ id, name }): MemberListItem => ({ content: name, id, selected: false })),
        toArray(),
        tap((members) => (this.members = members)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  onSubmit() {
    this.form.markAllAsTouched()
    const crewMember = this.form.getRawValue()
    if (this.form.valid && crewMember.member !== null) {
      this.addCrewMember(new DetailedCrewMember(this.video.id, crewMember.position, crewMember.member.id))
    }
  }

  private addCrewMember(crewMember: DetailedCrewMember) {
    this.service
      .addVideoCrewMember(crewMember)
      .pipe(
        tap((video) => {
          this.update.emit(video)
          this.closeModal()
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
