import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
})
export class CoursesComponent implements OnInit {
  courses$: Observable<any[]> = of([]);

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.getUserCourses().pipe(
      tap((courses) => {
        console.log('Отримані курси:', courses);
      }),
      catchError((error) => {
        console.error('Помилка завантаження курсів', error);
        return of([]); 
      })
    );
  }

  viewCourseDetails(courseId: string): void {
    this.router.navigate(['/course', courseId]);
    console.log('Viewing course details for:', courseId);
  }
}