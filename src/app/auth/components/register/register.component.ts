import { BackendErrorsInterface } from './../../../shared/types/backendErros.interface';
import {
    isSubmittingSelector,
    validationErrorsSelector,
} from './../../store/selectors';
import { registerAction } from '../../store/actions/registerActions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    constructor(private fb: FormBuilder, private store: Store) {}
    isSubmitting$: Observable<boolean>;
    backendErrors$: Observable<BackendErrorsInterface | null>;

    ngOnInit(): void {
        this.initializeForm();
        this.initializeValues();
    }

    initializeForm() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    initializeValues(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    }

    onSubmit(): void {
        console.log('submit', this.form.value, this.form.valid);
        const request: RegisterRequestInterface = {
            user: this.form.value,
        };
        this.store.dispatch(registerAction({ request }));
    }
}
