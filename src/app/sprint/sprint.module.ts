import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintComponent } from './sprint.component';
import { NewSprintComponent } from './new-sprint/new-sprint.component';

@NgModule({
  declarations: [SprintComponent, NewSprintComponent],
  imports: [
    CommonModule,
    SprintRoutingModule,
	ReactiveFormsModule
  ]
})
export class SprintModule { }
