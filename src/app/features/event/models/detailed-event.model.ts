import { Video } from '../../video/models'

export class DetailedEvent {
  constructor(
    public id: string,
    public url: string,
    public title: string,
    public description: string,
    public date: string,
    public visible: boolean,
    public videos: Video[],
  ) {}
}
