import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { FileVerificationService } from '../services/file-verification.service';

interface FileVerificationResult {
  id: number;
  fileUploadId: number;
  isVerified: boolean;
  violations: string[];
  verificationDate: Date;
}

@Component({
  selector: 'app-course-student-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-student-details.component.html',
  styleUrl: './course-student-details.component.scss'
})
export class CourseStudentDetailsComponent implements OnInit {
  studentId: string | null = null;
  courseId: number | null = null;
  verificationResult: FileVerificationResult | null = null;
  isVerifying = false;
  availableRules: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private fileVerificationService: FileVerificationService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentId = this.route.snapshot.paramMap.get('studentId');

    // Fetch available rules for verification
    this.fetchAvailableRules();
  }

  fetchAvailableRules(): void {
    this.courseService.getVerificationRules().subscribe(
      rules => {
        this.availableRules = rules;
      }
    );
  }

  verifyFile(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const ruleId = selectElement.value;

    if (!this.courseId || !this.studentId || !ruleId) {
      console.error('Missing course, student ID, or rule ID');
      return;
    }

    this.isVerifying = true;

    this.courseService.getFileId(this.courseId, this.studentId).subscribe({
      next: (fileId) => {
        if (!fileId) {
          console.error('No file ID found');
          this.isVerifying = false;
          return;
        }
        
        let actualFileId = String(fileId.fileId);
        console.log(actualFileId);

        this.fileVerificationService.verifyFile(actualFileId, ruleId).subscribe({
          next: (result) => {
            this.verificationResult = result;
            this.isVerifying = false;
          },
          error: (error) => {
            console.error('Verification failed', error);
            this.isVerifying = false;
          }
        });
      },
      error: (error) => {
        console.error('Failed to fetch file ID', error);
        this.isVerifying = false;
      }
    });
  }
}
