import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuItem} from "primeng/api";
import {MenubarModule} from "primeng/menubar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly model: MenuItem[] = [
    {
      label: 'Video',
      routerLink: 'video'
    },
    {
      label: 'Event',
      routerLink: 'event'
    },
    {
      label: 'Member',
      routerLink: 'member'
    }
  ]
}
