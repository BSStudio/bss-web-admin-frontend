import { Component } from '@angular/core';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';

@Component({
  selector: 'app-video-index',
  templateUrl: './video-index.component.html',
  styleUrls: ['./video-index.component.scss'],
})
export class VideoIndexComponent {
  model = new TableModel();

  constructor() {
    this.model.header = [
      new TableHeaderItem({ data: 'Cím' }),
      new TableHeaderItem({ data: 'URL' }),
      new TableHeaderItem({ data: 'Feltöltés dátuma' }),
      new TableHeaderItem({ data: 'Látható' }),
    ];
    this.model.data = [
      [
        new TableItem({ data: 'nyamm-01' }),
        new TableItem({ data: 'BSS Nyamm 01' }),
        new TableItem({ data: '2022-01-01' }),
        new TableItem({ data: true }),
      ],
      [
        new TableItem({ data: 'nyamm-02' }),
        new TableItem({ data: 'BSS Nyamm 02' }),
        new TableItem({ data: '2022-01-02' }),
        new TableItem({ data: false }),
      ],
      [
        new TableItem({ data: 'nyamm-03' }),
        new TableItem({ data: 'BSS Nyamm 03' }),
        new TableItem({ data: '2022-01-03' }),
        new TableItem({ data: true }),
      ],
    ];
  }
}
