import { AuthStateInterface } from './../types/authState.interface';
import { AppStateInferface } from './../../shared/types/appState.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const authFeatureSelector = createFeatureSelector<
    AppStateInferface,
    AuthStateInterface
>('auth');

export const isSubmittingSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.isSubmitting
);
