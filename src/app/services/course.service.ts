import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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
export class CourseService {
  private apiUrl = 'https://localhost:7274/api/Course'; 
  private authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}`);
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: (course) => console.log('Course fetched:', course),
        error: (err) => console.error('Error fetching course:', err),
      })
    );
  }

  getUserCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/by-group`);
  }
}