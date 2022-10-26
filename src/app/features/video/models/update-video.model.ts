export class UpdateVideo {
  constructor(
    public url: string,
    public title: string,
    public description: string,
    public videoUrl: string | null,
    public thumbnailUrl: string | null,
    public uploadedAt: string,
    public visible: boolean
  ) {}
}
