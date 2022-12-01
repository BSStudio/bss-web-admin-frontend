import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core'
import { concatMap, from, map, Subject, takeUntil, tap, toArray } from 'rxjs'
import { VideoCrewService } from '../../services/video-crew.service'
import { MemberService } from '../../../member/services/member.service'
import { DetailedVideo } from '../../../video/models'
import { BaseModal, ListItem } from 'carbon-components-angular'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { CrewMember } from '../../models'

interface MemberListItem extends ListItem {
  id: string
}

@Component({
  selector: 'app-video-crew-add-modal',
  templateUrl: './video-crew-add-modal.component.html',
})
export class VideoCrewAddModalComponent extends BaseModal implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  public positionSearch = ''
  public positions: ListItem[] = []
  public members: MemberListItem[] = []
  public form: FormGroup<{ member: FormControl<MemberListItem | null>; position: FormControl<ListItem | null> }>

  constructor(
    private fb: FormBuilder,
    private service: VideoCrewService,
    private memberService: MemberService,
    @Inject('video') public video: DetailedVideo,
    @Inject('update') protected update: EventEmitter<DetailedVideo>
  ) {
    super()
    this.form = this.fb.group({
      member: this.fb.control<MemberListItem | null>(null),
      position: this.fb.control<ListItem | null>(null),
    })
  }

  ngOnInit() {
    this.updatePositions()
    this.updateMembers()
  }

  updatePositions() {
    this.service
      .getPositions()
      .pipe(
        concatMap((positions) => from(positions)),
        map((position): ListItem => ({ content: position, selected: false })),
        toArray(),
        tap((positions) => (this.positions = positions)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  updateMembers() {
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
    const crewMember = this.form.getRawValue()
    if (this.form.valid && crewMember.member !== null && crewMember.position !== null) {
      this.addCrewMember(new CrewMember(crewMember.position.content, crewMember.member.id))
    }
  }

  private addCrewMember(crewMember: CrewMember) {
    this.service
      .addVideoCrewMember({ videoId: this.video.id, ...crewMember })
      .pipe(
        tap((video) => {
          this.update.emit(video)
          this.closeModal()
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  addPosition() {
    const newPosition = { content: this.positionSearch, selected: true }
    this.positions = [newPosition, ...this.positions.map(({ content }) => ({ content, selected: false }))]
    this.form.patchValue({
      position: newPosition,
    })
  }

  updatePositionSearch(positionSearch: string) {
    this.positionSearch = positionSearch
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
