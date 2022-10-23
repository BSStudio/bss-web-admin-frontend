import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { MemberService } from '../../data/member/service/member.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Member } from '../../data/member/model/member.model';
import { MemberStatusPipe } from '../../@shared/member/pipe/member-status.pipe';
import { CreateMemberModalComponent } from '../create-modal/create-member-modal.component';
import { BooleanPipe } from '../../@shared/boolean-pipe.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss'],
})
export class MemberTableComponent implements OnInit, OnDestroy {
  public readonly table = new TableModel();
  private readonly destroy$ = new Subject<boolean>();
  private readonly getMembers$: Observable<Member[]>;

  constructor(
    private router: Router,
    private service: MemberService,
    private modalService: ModalService,
    private memberStatusPipe: MemberStatusPipe,
    private booleanPipe: BooleanPipe
  ) {
    this.getMembers$ = this.service.getMembers().pipe(
      tap((members) => this.updateTable(members)),
      takeUntil(this.destroy$)
    );
  }

  ngOnInit() {
    this.initHeaders();
    this.getMembers();
  }

  getMembers() {
    this.getMembers$.subscribe();
  }

  async onRowClick(index: number) {
    const id = this.table.row(index)[0].title;
    await this.router.navigate(['member', id]);
  }

  showAddModal() {
    this.modalService
      .create({
        component: CreateMemberModalComponent,
        inputs: { refresh: this.getMembers },
      })
      .onDestroy(() => this.getMembers());
  }

  private updateTable(members: Member[]) {
    this.table.data = members.map((member) => this.memberToRow(member));
  }

  private memberToRow(member: Member): TableItem[] {
    return [
      new TableItem({ title: member.id, data: member.name }),
      new TableItem({ data: member.url }),
      new TableItem({ data: this.memberStatusPipe.transform(member.status) }),
      new TableItem({ data: member.role }),
      new TableItem({ data: this.booleanPipe.transform(member.archived) }),
    ];
  }

  private initHeaders() {
    this.table.header = [
      new TableHeaderItem({ data: $localize`Name` }),
      new TableHeaderItem({ data: $localize`URL` }),
      new TableHeaderItem({ data: $localize`Status` }),
      new TableHeaderItem({ data: $localize`Role` }),
      new TableHeaderItem({ data: $localize`Archived` }),
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
