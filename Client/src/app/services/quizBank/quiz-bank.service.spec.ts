import { TestBed } from '@angular/core/testing';

import { QuizBankService } from './quiz-bank.service';

describe('QuizBankService', () => {
  let service: QuizBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
