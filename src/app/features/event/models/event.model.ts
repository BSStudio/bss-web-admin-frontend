export class Event {
  constructor(
    public id: string,
    public url: string,
    public title: string,
    public description: string,
    public date: string,
    public visible: boolean
  ) {}
}
