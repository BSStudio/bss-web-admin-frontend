import { Component, OnInit } from '@angular/core';
import { IconService } from 'carbon-components-angular';
// @ts-ignore
import { Renew16, View16, ViewOffFilled16 } from '@carbon/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private iconService: IconService) {}

  ngOnInit(): void {
    this.iconService.register(Renew16);
    this.iconService.register(View16);
    this.iconService.register(ViewOffFilled16);
  }
}
