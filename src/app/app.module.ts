import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppPipesModule } from './app-pipes.module';
import { FeedComponent } from './feed/feed.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AboutComponent } from './about/about.component';
import { UserSettingsComponent } from './settings/user-settings/user-settings.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectDashboardComponent } from './projects/project-dashboard/project-dashboard.component';
import { ProjectOverviewCardsComponent } from './projects/project-overview-cards/project-overview-cards.component';
import { ProjectEditFormComponent } from './projects/project-edit-form/project-edit-form.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectDeleteComponent } from './projects/project-delete/project-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    UsersListComponent,
    UserProfileComponent,
    LoginComponent,
    NotificationsComponent,
    AboutComponent,
    UserSettingsComponent,
    RegisterComponent,
    ProjectsListComponent,
    ProjectDashboardComponent,
    ProjectOverviewCardsComponent,
    ProjectEditFormComponent,
    NewProjectComponent,
    ProjectEditComponent,
    ProjectDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	AppPipesModule,
	HttpClientModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
