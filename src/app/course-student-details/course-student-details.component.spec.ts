import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStudentDetailsComponent } from './course-student-details.component';

describe('CourseStudentDetailsComponent', () => {
  let component: CourseStudentDetailsComponent;
  let fixture: ComponentFixture<CourseStudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseStudentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
