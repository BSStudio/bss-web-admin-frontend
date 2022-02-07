import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultShellComponent } from './shell/default-shell.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultShellComponent,
    children: [
      {
        path: 'video',
        loadChildren: () => import('./pages/video/video.module').then(({ VideoModule }) => VideoModule),
      },
      {
        path: 'member',
        loadChildren: () => import('./pages/member/member.module').then(({ MemberModule }) => MemberModule),
      },
      {
        path: 'event',
        loadChildren: () => import('./pages/event/event.module').then(({ EventModule }) => EventModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
