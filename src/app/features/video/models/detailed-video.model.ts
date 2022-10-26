import { SimpleCrew } from '../../crew/models/simple-crew.model';

export class DetailedVideo {
  constructor(
    public id: string,
    public url: string,
    public title: string,
    public description: string,
    public videoUrl: string,
    public thumbnailUrl: string,
    public uploadedAt: string,
    public visible: boolean,
    public crew: SimpleCrew[]
  ) {}
}
