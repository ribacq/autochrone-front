import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppPipesModule } from '../app-pipes.module';
import { SprintRoutingModule } from './sprint-routing.module';
import { SprintComponent } from './sprint.component';
import { NewSprintComponent } from './new-sprint/new-sprint.component';

@NgModule({
  declarations: [SprintComponent, NewSprintComponent],
  imports: [
    AppPipesModule,
    CommonModule,
    SprintRoutingModule,
	ReactiveFormsModule
  ]
})
export class SprintModule { }
