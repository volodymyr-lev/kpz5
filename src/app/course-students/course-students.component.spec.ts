import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStudentsComponent } from './course-students.component';

describe('CourseStudentsComponent', () => {
  let component: CourseStudentsComponent;
  let fixture: ComponentFixture<CourseStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
