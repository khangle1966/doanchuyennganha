import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { QuestionService } from 'src/app/services/question/question.service';
import * as QuestionAction from '../actions/question.actions';

@Injectable()
export class QuestionEffects {
  constructor(
    private questionService: QuestionService,
    private action$: Actions
  ) {}
  get$ = createEffect(() =>
    this.action$.pipe(
      ofType(QuestionAction.getAllByQuizId),
      exhaustMap((action) =>
        this.questionService.getQuestion(action.idToken).pipe(
          map((item) => {
            if (item != undefined && item != null) {
              return QuestionAction.getAllByQuizIdSuccess({ questions: item });
            } else {
              return QuestionAction.getAllByQuizIdFailure({
                error: 'get failure',
              });
            }
          }),
          catchError((error) =>
            of(QuestionAction.getAllByQuizIdFailure({ error }))
          )
        )
      )
    )
  );
  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(QuestionAction.create),
      exhaustMap((action) =>
        this.questionService.create(action.idToken, action.question).pipe(
          map((item) => {
            if (item != undefined && item != null) {
              if ((item as any).message) {
                console.log(item);
                return QuestionAction.createFailure({
                  error: (item as any).message,
                });
              }
              return QuestionAction.createSuccess({ newQuestion: item });
            } else {
              return QuestionAction.createFailure({ error: 'create failure' });
            }
          }),
          catchError((error) => of(QuestionAction.createFailure({ error })))
        )
      )
    )
  );
  update$ = createEffect(() =>
    this.action$.pipe(
      ofType(QuestionAction.update),
      exhaustMap((action) =>
        this.questionService.update(action.idToken, action.question).pipe(
          map((item) => {
            if (item != undefined && item != null) {
              return QuestionAction.updateSuccess({ updatedQuestion: item });
            } else {
              return QuestionAction.updateFailure({ error: 'update failure' });
            }
          }),
          catchError((error) => of(QuestionAction.updateFailure({ error })))
        )
      )
    )
  );
  delete$ = createEffect(() =>
    this.action$.pipe(
      ofType(QuestionAction.remove),
      exhaustMap((action) =>
        this.questionService.remove(action.idToken, action.questionId).pipe(
          map((item) => {
            if (item != undefined && item != null) {
              return QuestionAction.removeSuccess({ removedQuestion: item });
            } else {
              return QuestionAction.removeFailure({ error: 'remove failure' });
            }
          }),
          catchError((error) => of(QuestionAction.removeFailure({ error })))
        )
      )
    )
  );
}
