import { PersistanceService } from './../../../shared/services/persistance.service';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { AuthService } from './../../services/auth.service';
import {
    registerAction,
    registerFailureAction,
    registerSuccessAction,
} from './../actions/registerActions';
import { Injectable } from '@angular/core';

import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { dispatch } from 'rxjs/internal/observable/pairs';

@Injectable()
export class RegisterEffect {
    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registerAction),
            switchMap(({ request }) => {
                return this.authService.register(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        this.persistanceService.set(
                            'accessToken',
                            currentUser.token
                        );
                        return registerSuccessAction({ currentUser });
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(
                            registerFailureAction({
                                errors: errorResponse.error.errors,
                            })
                        );
                    })
                );
            })
        )
    );

    redirectAfterSubmit$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(registerSuccessAction),
                tap(() => {
                    this.router.navigateByUrl('/');
                })
            ),
        { dispatch: false }
    );

    constructor(
        private router: Router,
        private actions$: Actions,
        private authService: AuthService,
        private persistanceService: PersistanceService
    ) {}
}
