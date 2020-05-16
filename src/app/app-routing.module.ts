import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AboutComponent } from './about/about.component';
import { UserSettingsComponent } from './settings/user-settings/user-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: FeedComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'u/:username', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: UserSettingsComponent, children: [
	{ path: 'user', component: UserSettingsComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
