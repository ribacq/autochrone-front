import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AboutComponent } from './about/about.component';
import { UserSettingsComponent } from './settings/user-settings/user-settings.component';
import { ProjectDashboardComponent } from './projects/project-dashboard/project-dashboard.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'feed', component: FeedComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'u/:username', children: [
    { path: '', component: UserProfileComponent },
    { path: ':slug', children: [
	  { path: '', component: ProjectDashboardComponent },
	  { path: 'edit', component: ProjectEditComponent }
	]}
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', children: [
    { path: '', component: UserSettingsComponent },
	{ path: 'user', component: UserSettingsComponent }
  ]},
  { path: 'new', component: NewProjectComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
