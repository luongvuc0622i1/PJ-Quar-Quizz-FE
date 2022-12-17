import { TestBed } from '@angular/core/testing';

import { ExamTestDetailService } from './exam-test-detail.service';

describe('ExamTestDetailService', () => {
  let service: ExamTestDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamTestDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
