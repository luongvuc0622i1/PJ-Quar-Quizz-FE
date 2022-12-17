import { TestBed } from '@angular/core/testing';

import { ExamQuizService } from './exam-quiz.service';

describe('ExamQuizService', () => {
  let service: ExamQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
