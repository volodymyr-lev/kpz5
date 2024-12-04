import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { CustomComponentComponent } from './app/custom-component/custom-component.component'; 
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { customInterceptorInterceptor } from './app/custom-interceptor.interceptor';
import { authInterceptor } from './app/auth.interceptor';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { HomeComponent } from './app/home/home.component';
import { UnauthorizedComponent } from './app/unauthorized/unauthorized.component';
import { AuthGuard } from './app/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'custom', component: CustomComponentComponent },
  { path:'unauthorized', component: UnauthorizedComponent },
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate:[AuthGuard] }, 
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([customInterceptorInterceptor, authInterceptor])),
  ]
});