import { Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { Member } from '../../models'
import { MemberProfilePictureComponent } from '../../components/member-profile-picture/member-profile-picture.component'

@Component({
  selector: 'app-video-id',
  templateUrl: './member-id.component.html',
  styleUrls: ['./member-id.component.scss'],
})
export class MemberIdComponent {
  public member = <Member>this.route.snapshot.data['member']
  @ViewChild('picture', { static: true })
  public picture!: MemberProfilePictureComponent

  constructor(
    private route: ActivatedRoute,
    private title: Title,
  ) {
    this.title.setTitle(this.member.name)
  }

  updateImage() {
    this.picture.updateImage()
  }

  setMember(member: Member) {
    this.member = member
    this.title.setTitle(this.member.name)
  }
}
