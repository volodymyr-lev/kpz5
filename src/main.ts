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
import { RoleGuard } from './app/role.guard';
import { CoursesComponent } from './app/courses/courses.component';
import { ProfileComponent } from './app/profile/profile.component';
import { CourseDetailComponent } from './app/course-detail/course-detail.component';
import { AssignmentComponent } from './app/assignment/assignment.component';
import { CourseStudentsComponent } from './app/course-students/course-students.component';
import { CourseStudentDetailsComponent } from './app/course-student-details/course-student-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'custom', component: CustomComponentComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { 
    path: 'courses', component: CoursesComponent, canActivate:[RoleGuard], 
    data: {roles:["Student","Lecturer"]}
  }, 
  { 
    path: 'course/:id', component: CourseDetailComponent, canActivate:[RoleGuard],
    data: {roles:["Student"]}
  },
  { 
    path: 'course/:id/students', component: CourseStudentsComponent, canActivate:[RoleGuard],
    data: {roles:["Lecturer"]}
  },
  { 
    path: 'course/:id/students/:studentId', component: CourseStudentDetailsComponent, canActivate:[RoleGuard],
    data: {roles:["Lecturer"]}
  },
  {
    path: 'course/:courseId/assignment/:assignmentId', component: AssignmentComponent, canActivate:[RoleGuard],
    data: {roles:["Student","Lecturer"]}
  },
  { path: 'profile', component: ProfileComponent},
  { 
    path: '', component: HomeComponent, pathMatch: 'full', canActivate:[RoleGuard], 
    data: {roles:["Administrator", "Student", "Lecturer", "Assistant", "Mentor", "Advisor", "Unassigned"]} 
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
}).catch((err) => console.error(err));;