import { Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { Subject, takeUntil, tap } from 'rxjs';
import { EventService } from '../../services/event.service';
import { Event } from '../../models';
import { formatDate } from '@angular/common';
import { BooleanPipe } from '../../../../shared/pipes/boolean.pipe';
import { Router } from '@angular/router';
import { CreateEventModalComponent } from '../create-event-modal/create-event-modal.component';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
})
export class EventTableComponent implements OnInit, OnDestroy {
  public readonly table = new TableModel();
  public searchValue = '';
  private readonly destroy$ = new Subject<boolean>();

  constructor(
    private service: EventService,
    private router: Router,
    private modalService: ModalService,
    private booleanPipe: BooleanPipe,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.table.isRowFiltered = (i) => this.isRowFiltered(i);
    this.initHeaders();
    this.getEvents();
  }

  getEvents() {
    this.service
      .getEvents()
      .pipe(
        tap((events) => this.updateTable(events)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  filterNodeNames(searchString: string) {
    this.searchValue = searchString;
  }

  showAddModal() {
    this.modalService.create({ component: CreateEventModalComponent }).onDestroy(() => this.getEvents());
  }

  async onRowClick(index: number) {
    const id = this.table.row(index)[0].title;
    await this.router.navigate(['event', id]);
  }

  private updateTable(events: Event[]) {
    this.table.data = events.map((event) => this.eventToRow(event));
  }

  private eventToRow(event: Event): TableItem[] {
    return [
      new TableItem({ title: event.id, data: event.title }),
      new TableItem({ data: event.url }),
      new TableItem({ data: formatDate(event.date, 'YYYY-MM-dd', this.locale) }),
      new TableItem({ data: this.booleanPipe.transform(event.visible) }),
    ];
  }

  private initHeaders() {
    this.table.header = [
      new TableHeaderItem({ data: $localize`Title` }),
      new TableHeaderItem({ data: $localize`URL` }),
      new TableHeaderItem({ data: $localize`Date` }),
      new TableHeaderItem({ data: $localize`Visible` }),
    ];
  }

  private isRowFiltered(index: number) {
    const title: string = this.table.row(index)[0].data;
    const url: string = this.table.row(index)[1].data;
    const searchValue = this.searchValue.toLowerCase();
    return !title.toLowerCase().includes(searchValue) || !url.toLowerCase().includes(searchValue);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
