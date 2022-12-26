import { Component, OnDestroy, OnInit } from '@angular/core'
import { ModalService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular'
import { MemberService } from '../../services/member.service'
import { Subject, takeUntil, tap } from 'rxjs'
import { Member } from '../../models/member.model'
import { MemberStatusPipe } from '../../pipes/member-status.pipe'
import { MemberCreateModalComponent } from '../member-create-modal/member-create-modal.component'
import { BooleanPipe } from '../../../../shared/pipes/boolean.pipe'
import { Router } from '@angular/router'

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
})
export class MemberTableComponent implements OnInit, OnDestroy {
  public readonly table = new TableModel()
  public searchValue = ''
  private readonly destroy$ = new Subject<void>()

  constructor(
    private router: Router,
    private service: MemberService,
    private modalService: ModalService,
    private memberStatusPipe: MemberStatusPipe,
    private booleanPipe: BooleanPipe
  ) {}

  ngOnInit() {
    this.initHeaders()
    this.getMembers()
    this.table.isRowFiltered = (i) => this.isRowFiltered(i)
  }

  getMembers() {
    this.service
      .getMembers()
      .pipe(
        tap((members) => this.updateTable(members)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  filterNodeNames(searchString: string) {
    this.searchValue = searchString
  }

  async onRowClick(index: number) {
    const id = this.table.row(index)[0].title
    await this.router.navigate(['member', id])
  }

  showAddModal() {
    this.modalService
      .create({
        component: MemberCreateModalComponent,
      })
      .onDestroy(() => this.getMembers())
  }

  private updateTable(members: Member[]) {
    this.table.data = members.map((member) => this.memberToRow(member))
  }

  private memberToRow(member: Member): TableItem[] {
    return [
      new TableItem({ title: member.id, data: member.name }),
      new TableItem({ data: member.url }),
      new TableItem({ data: this.memberStatusPipe.transform(member.status) }),
      new TableItem({ data: member.role }),
      new TableItem({ data: this.booleanPipe.transform(member.archived) }),
    ]
  }

  private initHeaders() {
    this.table.header = [
      new TableHeaderItem({ data: $localize`Name` }),
      new TableHeaderItem({ data: $localize`URL` }),
      new TableHeaderItem({ data: $localize`Status` }),
      new TableHeaderItem({ data: $localize`Role` }),
      new TableHeaderItem({ data: $localize`Archived` }),
    ]
  }

  private isRowFiltered(index: number) {
    const name: string = this.table.row(index)[0].data
    const url: string = this.table.row(index)[1].data
    const status: string = this.table.row(index)[2].data
    const role: string = this.table.row(index)[3].data
    const searchValue = this.searchValue.toLowerCase()
    return !(
      name.toLowerCase().includes(searchValue) ||
      url.toLowerCase().includes(searchValue) ||
      status.toLowerCase().includes(searchValue) ||
      role.toLowerCase().includes(searchValue)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
