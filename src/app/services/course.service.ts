import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

export interface Course {
  id: number;
  name: string;
  description: string;
  credits: number;
  lecturer: {
    id: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
// export class CourseService {
//   private apiUrl = 'https://localhost:7274/api/Course'; 

//   constructor(private http: HttpClient) {}

//   getCourses(): Observable<Course[]> {
//     return this.http.get<Course[]>(`${this.apiUrl}`);
//   }

//   getCourseById(id: number): Observable<Course> {
//     return this.http.get<Course>(`${this.apiUrl}/${id}`);
//   }

//   getUserCourses(): Observable<Course[]> {

//     return this.http.get<Course[]>(`${this.apiUrl}/by-group`);
//   }
// }

export class CourseService {
  private apiUrl = 'https://localhost:7274/api/Course'; 
  private authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  getUserCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/by-group`);
  }
}