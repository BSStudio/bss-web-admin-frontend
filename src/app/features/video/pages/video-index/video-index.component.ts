import { Component } from '@angular/core'

@Component({
  selector: 'app-video-index',
  template: `
    <h1 i18n>Video manager</h1>
    <article>
      <p i18n>A short description will be added here</p>
    </article>
    <app-video-table></app-video-table>
  `,
})
export class VideoIndexComponent {}
