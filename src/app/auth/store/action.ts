import { RegisterRequestInterface } from './../types/registerRequest.interface';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<{ request: RegisterRequestInterface }>()
);

export const registerActionSuccess = createAction(ActionTypes.REGISTER_SUCCESS);
