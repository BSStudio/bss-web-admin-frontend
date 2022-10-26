export class UpdateEvent {
  constructor(
    public url: string,
    public title: string,
    public description: string,
    public date: string,
    public visible: boolean
  ) {}
}
