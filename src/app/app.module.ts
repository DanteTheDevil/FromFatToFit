import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth/auth.service';
import { CalculatorService } from './services/calculator/calculator.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BmrComponent } from './components/bmr/bmr.component';
import { FoodComponent } from './components/food/food.component';
import { CaloriesComponent } from './components/calories/calories.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ActivityComponent } from './components/activity/activity.component';
import { AuthGuard } from './guards/auth/auth.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bmr', component: BmrComponent},
  {path: 'food', component: FoodComponent},
  {path: 'activity', component: ActivityComponent},
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
    FoodComponent,
    CaloriesComponent,
    ProfileComponent,
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
  ],
  providers: [AuthService, CalculatorService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
