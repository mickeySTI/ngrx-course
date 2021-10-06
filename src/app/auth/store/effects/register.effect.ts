import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { AuthService } from './../../services/auth.service';
import {
    registerAction,
    registerFailureAction,
    registerSuccessAction,
} from './../actions/registerActions';
import { Injectable } from '@angular/core';

import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RegisterEffect {
    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registerAction),
            switchMap(({ request }) => {
                return this.authService.register(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        return registerSuccessAction({ currentUser });
                    }),
                    catchError(() => {
                        return of(registerFailureAction());
                    })
                );
            })
        )
    );

    constructor(private actions$: Actions, private authService: AuthService) {}
}
