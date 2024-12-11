import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

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
  hasUploaded = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Check if the file has already been uploaded for this assignment
  checkIfUploaded(): void {
    if (this.assignment) {
      const assignmentId = this.assignment.id;
      this.courseService.hasUserAlreadyUploaded(assignmentId).subscribe((uploaded: boolean) => {
        this.hasUploaded = uploaded; 
        console.log('Has the assignment been uploaded?', uploaded);
      });
    }
  }

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

        this.checkIfUploaded(); // Check if the file has already been uploaded
      });
    }
  }

  // File selected handler
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Upload file handler
  uploadFile(): void {
    if (this.selectedFile && this.assignment) {
      this.isUploading = true;

      const formData = new FormData();
      const studentId = this.authService.getCurrentUserId() || '';

      formData.append('file', this.selectedFile);
      formData.append('title', this.assignment.title);
      formData.append('description', this.assignment.description);
      formData.append('assignmentId', String(this.assignment.id));

      if (this.courseDetails.hasCourseWork) {
        formData.append('advisorId', this.courseDetails.lecturer.id);
        formData.append('studentId', studentId);

        // Log form data entries for debugging
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }

        this.courseService.uploadCourseWorkFile(formData).subscribe({
          next: (response) => {
            console.log('File uploaded successfully', response);
            this.isUploading = false;
            this.checkIfUploaded(); // Check again if uploaded
          },
          error: (error) => {
            console.error('File upload failed', error);
            this.isUploading = false;
          }
        });
      } else if (this.courseDetails.hasThesis) {
        formData.append('mentorId', this.courseDetails.lecturer.id);
        formData.append('studentId', studentId);

        this.courseService.uploadThesisFile(formData).subscribe({
          next: (response) => {
            console.log('File uploaded successfully', response);
            this.isUploading = false;
            this.checkIfUploaded(); // Check again if uploaded
          },
          error: (error) => {
            console.error('File upload failed', error);
            this.isUploading = false;
          }
        });
      } else {
        console.log("Not implemented yet.");
      }
    }
  }
}
