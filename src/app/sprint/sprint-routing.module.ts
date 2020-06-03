import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SprintComponent } from './sprint.component';
import { NewSprintComponent } from './new-sprint/new-sprint.component';

const routes: Routes = [
  { path: '', component: NewSprintComponent },
  { path: ':sslug', component: SprintComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
