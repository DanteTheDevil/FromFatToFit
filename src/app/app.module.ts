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
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BmrComponent } from './bmr/bmr.component';
import { ProfileComponent } from './core/auth/profile/profile.component';
import { ActivityListComponent } from './activities/list/activity-list.component';
import { ItemComponent } from './activities/item/item.component';

import { AuthService } from './core/auth/auth.service';
import { CalculatorService } from './bmr/calculator.service';
import { UsersService } from './shared/services/users/users.service';

import { ProfileGuard } from './core/auth/profile/profile.guard';
import { ItemGuard } from './activities/item/item.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bmr', component: BmrComponent, canActivate: [ProfileGuard]},
  {path: 'activities', component: ActivityListComponent, canActivate: [ProfileGuard]},
  {path: 'activities/:name', component: ItemComponent, canActivate: [ItemGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]},
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
    ItemComponent
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
    ProfileGuard,
    ItemGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
