import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedEvent } from '../../models';
import { Subject, takeUntil, tap } from 'rxjs';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-video-id',
  templateUrl: './event-id.component.html',
  styleUrls: ['./event-id.component.scss'],
})
export class EventIdComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<boolean>();
  public event: DetailedEvent;

  constructor(private route: ActivatedRoute, private service: EventService) {
    this.event = <DetailedEvent>this.route.snapshot.data['event'];
  }

  ngOnInit() {}

  refreshPage() {
    console.log('refresh');
    this.service
      .getEvent(this.event.id)
      .pipe(
        tap((event) => (this.event = event)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
