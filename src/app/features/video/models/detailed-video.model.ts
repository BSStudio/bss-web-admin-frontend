import { CrewMember } from '../../video-crew/models'

export class DetailedVideo {
  constructor(
    public id: string,
    public url: string,
    public title: string,
    public description: string,
    public uploadedAt: string,
    public visible: boolean,
    public crew: CrewMember[]
  ) {}
}
