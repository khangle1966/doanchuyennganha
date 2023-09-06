import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as QuizBankActions from '../actions/quizBank.actions';
import { QuizBankService } from 'src/app/services/quizBank/quiz-bank.service';

@Injectable()
export class QuizBankEffects {
  constructor(
    private quizBankService: QuizBankService,
    private action$: Actions
  ) {}

  getQuizBanks$ = createEffect(() =>
    this.action$.pipe(
      ofType(QuizBankActions.getquizBankId),
      exhaustMap((action) =>
        this.quizBankService.getquizBankId(action.idToken, action.id).pipe(
          map((quizBank) => QuizBankActions.getquizBankIdSuccess({ quizBank })),
          catchError((error) =>
            of(QuizBankActions.getquizBankIdFailure({ error }))
          )
        )
      )
    )
  );

  addQuizBank$ = createEffect(() =>
    this.action$.pipe(
      ofType(QuizBankActions.addquizBank),
      exhaustMap((action) =>
        this.quizBankService.addquizBank(action.idToken, action.quizBank).pipe(
          map((quizBank) => {
            if (quizBank != undefined && quizBank != null) {
              return QuizBankActions.addquizBankSuccess();
            } else {
              return QuizBankActions.addquizBankFailure({
                error: 'create failure',
              });
            }
          }),
          catchError((error) =>
            of(QuizBankActions.addquizBankFailure({ error }))
          )
        )
      )
    )
  );
}
