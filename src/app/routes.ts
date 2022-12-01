import { Routes } from '@angular/router'
import { DefaultShellComponent } from './core/components/shell/default-shell.component'

export const ROUTES: Routes = [
  {
    path: '',
    component: DefaultShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/routing').then((m) => m.ROUTES),
      },
      {
        path: 'video',
        loadChildren: () => import('./features/video/video.module').then(({ VideoModule }) => VideoModule),
      },
      {
        path: 'member',
        loadChildren: () => import('./features/member/member.module').then(({ MemberModule }) => MemberModule),
      },
      {
        path: 'event',
        loadChildren: () => import('./features/event/event.module').then(({ EventModule }) => EventModule),
      },
    ],
  },
]
