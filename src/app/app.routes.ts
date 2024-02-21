import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'video',
        loadComponent: () =>
          import('./features/video/video.component').then(
            (c) => c.VideoComponent,
          ),
      },
      {
        path: 'event',
        loadComponent: () =>
          import('./features/event/event.component').then(
            (c) => c.EventComponent,
          ),
      },
      {
        path: 'member',
        loadComponent: () =>
          import('./features/member/member.component').then(
            (c) => c.MemberComponent,
          ),
      },
    ],
  },
]
