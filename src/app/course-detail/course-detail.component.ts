import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Course, CourseService } from '../services/course.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
  standalone: true
})

export class CourseDetailComponent {
  courseDetails$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (courseId) {
      this.courseDetails$ = this.courseService.getCourseById(courseId);
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  viewAssignmentDetails(assignmentId: string): void {
    this.router.navigate(['/course', Number(this.route.snapshot.paramMap.get('id')), 'assignment', assignmentId]);
    console.log('Viewing assignment details for course:', Number(this.route.snapshot.paramMap.get('id')), 'assignment:', assignmentId);
  }
}
