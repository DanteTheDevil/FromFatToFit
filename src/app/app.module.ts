import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BmrComponent } from './components/bmr/bmr.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ActivityListComponent } from './components/activityList/activityList.component';
import { ActivityComponent } from './components/activity/activity.component';

import { AuthService } from './services/auth/auth.service';
import { CalculatorService } from './services/calculator/calculator.service';
import { UsersService } from './services/users/users.service';

import { AuthGuard } from './guards/auth/auth.guard';
import { ActivitiesGuard } from './guards/activities/activities.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bmr', component: BmrComponent, canActivate: [AuthGuard]},
  {path: 'activities', component: ActivityListComponent, canActivate: [AuthGuard]},
  {path: 'activities/:name', component: ActivityComponent, canActivate: [ActivitiesGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BmrComponent,
    ProfileComponent,
    ActivityListComponent,
    ActivityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    CalculatorService,
    UsersService,
    AuthGuard,
    ActivitiesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
