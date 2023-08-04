export class Video {
  constructor(
    public id: string,
    public url: string,
    public title: string,
    public uploadedAt: string,
    public visible: boolean,
  ) {}
}
