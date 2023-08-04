export class UpdateVideo {
  constructor(
    public url: string,
    public title: string,
    public description: string,
    public uploadedAt: string,
    public visible: boolean,
  ) {}
}
