import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultShellComponent } from './core/components/shell/default-shell.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(({ HomeModule }) => HomeModule),
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
