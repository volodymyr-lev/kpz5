import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

interface Course {
  id: string;
  name: string;
  description: string;
  credits: number;
  lecturer?: {
    userName: string;
  };
  studentCount?: number;
  completionPercentage?: number;
}

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
})
export class CoursesComponent implements OnInit {
  courses$: Observable<any> = of([]);
  isLecturer: boolean = false;

  constructor(
    private courseService: CourseService, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is a lecturer
    this.isLecturer = this.authService.hasRole('Lecturer');

    // Load courses based on user role
    this.courses$ = this.courseService.getUserCourses().pipe(
      tap((courses) => {
        console.log(`Отримані курси (${this.isLecturer ? 'Викладач' : 'Студент'}):`, courses);
      }),
      map((courses) => {
        // Additional processing for lecturer view
        if (this.isLecturer) {
          return courses.map(course => ({
            ...course,
            studentCount: this.getStudentCount(course.id),
            completionPercentage: this.calculateCourseCompletion(course.id)
          }));
        }
        return courses;
      }),
      catchError((error) => {
        console.error('Помилка завантаження курсів', error);
        return of([]); 
      })
    );
  }

  viewCourseDetails(courseId: number): void {
    this.router.navigate(['/course', courseId]);
    console.log('Viewing course details for:', courseId);
  }

  // Lecturer-specific methods
  editCourse(courseId: number): void {
    this.router.navigate(['/course', courseId, 'edit']);
    console.log('Editing course:', courseId);
  }

  viewStudents(courseId: string): void {
    this.router.navigate(['/course', courseId, 'students']);
    console.log('Viewing students for course:', courseId);
  }

  createNewCourse(): void {
    this.router.navigate(['/course', 'create']);
    console.log('Creating new course');
  }

  private getStudentCount(courseId: number): number {
    // todo
    return 29;
  }

  private calculateCourseCompletion(courseId: number): number {
    // todo
    return 78;
  }
}