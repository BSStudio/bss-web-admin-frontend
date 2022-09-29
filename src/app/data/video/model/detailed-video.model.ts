import { SimpleCrew } from '../../crew/model/simple-crew.model';

export class DetailedVideo {
  constructor(
    public id: string,
    public url: string,
    public title: string,
    public description: string,
    public videoUrl: string | null,
    public thumbnailUrl: string | null,
    public uploadedAt: string,
    public visible: boolean,
    public crew: SimpleCrew[]
  ) {}
}
