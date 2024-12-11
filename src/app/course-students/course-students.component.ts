import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router} from '@angular/router';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';

interface StudentSubmission {
  studentId: string;
  userName: string;
  assignmentId: string;
  assignmentTitle: string;
  status: string;
}

@Component({
  selector: 'app-course-students',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-students.component.html',
  styleUrl: './course-students.component.scss'
})
export class CourseStudentsComponent implements OnInit {
  students$!: Observable<StudentSubmission[]>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.students$ = this.courseService.getStudentSubmissions(courseId);

    this.students$.subscribe((response)=>{
      console.log(response);
    })
  }

  viewStudentDetails(studentId: string): void {
    this.router.navigate(['/course', Number(this.route.snapshot.paramMap.get('id')), 'students', studentId]);
    console.log('Viewing student details:', studentId);
  }
}