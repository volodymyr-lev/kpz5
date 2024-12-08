import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
})
export class CoursesComponent implements OnInit {
  courses$: Observable<any[]> = of([]);

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.getUserCourses().pipe(
      catchError((error) => {
        console.error('Помилка завантаження курсів', error);
        return of([]); 
      })
    );
  }

  viewCourseDetails(courseId: string): void {
    // Implement course details navigation logic here
    console.log('Viewing course details for:', courseId);
  }
}