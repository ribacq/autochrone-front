import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SprintComponent } from './sprint.component';
import { NewSprintComponent } from './new-sprint/new-sprint.component';
import { SprintDeleteComponent } from './sprint-delete/sprint-delete.component';

const routes: Routes = [
  { path: '', component: NewSprintComponent },
  { path: ':sslug', children: [
    { path: '', component: SprintComponent },
	{ path: 'delete', component: SprintDeleteComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
