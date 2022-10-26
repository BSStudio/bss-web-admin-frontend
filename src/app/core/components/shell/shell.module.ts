import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UIShellModule } from 'carbon-components-angular';
import { HeaderComponent } from '../header/header.component';
import { DefaultShellComponent } from './default-shell.component';

@NgModule({
  imports: [CommonModule, RouterModule, UIShellModule],
  declarations: [HeaderComponent, DefaultShellComponent],
})
export class ShellModule {}
