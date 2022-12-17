import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamQuizDetailComponent } from './exam-quiz-detail.component';

describe('ExamQuizDetailComponent', () => {
  let component: ExamQuizDetailComponent;
  let fixture: ComponentFixture<ExamQuizDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamQuizDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamQuizDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
