import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
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
    if(this.authService.hasRole("Lecturer")){
      return this.http.get<Course[]>(`${this.apiUrl}/get-lecturer-courses`);
    }
    return this.http.get<Course[]>(`${this.apiUrl}/by-group`);
  }

  uploadCourseWorkFile(formData: FormData): Observable<any> {
    const uploadUrl = 'https://localhost:7274/api/coursework/file/upload';
  
    const headers = new HttpHeaders();
    
    return this.http.post(uploadUrl, formData, { headers });
  }

  uploadThesisFile(formData: FormData): Observable<any> {
    const uploadUrl = 'https://localhost:7274/api/thesis/file/upload';
  
    const headers = new HttpHeaders();
    
    return this.http.post(uploadUrl, formData, { headers });
  }
  // Optional: Method to handle file upload progress
  uploadProgress(event: any): number {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round(100 * event.loaded / event.total);
      return percentDone;
    }
    return 0;
  }

  hasUserAlreadyUploaded(assignmentId: any): Observable<boolean> {
    const studentId = this.authService.getCurrentUserId(); 

    if (!studentId) {
      return new Observable(observer => observer.next(false)); 
    }

    return this.http.get<boolean>(`https://localhost:7274/api/coursework/file/check-uploaded`, {
      params: {
        studentId: studentId,
        assignmentId: assignmentId
      }
    });
  }

  getStudentSubmissions(courseId: number)
  {
      return this.http.get<any>(`${this.apiUrl}/get-course-submissions/${courseId}`);
  }


  getVerificationRules(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7274/api/Rules/list');
  }

  getFileId(courseId: number, studentId: string) {
    return this.http.get<any>(
      `https://localhost:7274/api/Course/get-file-id?courseId=${courseId}&studentId=${studentId}`
    );
  }
}