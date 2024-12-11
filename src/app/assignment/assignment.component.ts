import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AssignmentData {
  id: number;
  courseId: number;
  description: string;
  dueDate: string;
  ruleId: number;
  score: number | null;
  status: string;
  title: string;
  lecturerName: string;
}

@Component({
  selector: 'app-assignment',
  imports: [CommonModule, FormsModule],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.scss',
  standalone: true
})
export class AssignmentComponent implements OnInit {
  courseDetails: any;
  assignment: AssignmentData | null = null;
  selectedFile: File | null = null;
  isUploading = false;

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
            (a: AssignmentData) => a.id === assignmentId
          );
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile(): void {
    if (this.selectedFile && this.assignment) {
      this.isUploading = true;

      const formData = new FormData();



      formData.append('file', this.selectedFile);
      formData.append('title', this.assignment.title);
      formData.append('description', this.assignment.description);
      formData.append('advisorId', this.courseDetails.lecturer.id);
      formData.append('studentId', 'currentStudentId'); 

      this.courseService.uploadCourseWorkFile(formData).subscribe({
        next: (response) => {
          console.log('File uploaded successfully', response);
          this.isUploading = false;
        },
        error: (error) => {
          console.error('File upload failed', error);
          this.isUploading = false;
        }
      });
    }
  }
}
