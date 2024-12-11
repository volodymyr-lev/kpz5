import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Router } from 'express';

@Component({
  selector: 'app-assignment',
  imports: [],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.scss',
  standalone: true
})
export class AssignmentComponent {
  courseDetails: any;
  assignment: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    const assignmentId = Number(this.route.snapshot.paramMap.get('assignmentId'));

    if (courseId && assignmentId) {
      this.courseService.getCourseById(courseId).subscribe((details) => {
        this.courseDetails = details;

        if (this.courseDetails.assignments) {
          this.assignment = this.courseDetails.assignments.find(
            (a: any) => a.id === assignmentId
          );

          console.log(this.assignment);
        }
      });
    }
  }
}
