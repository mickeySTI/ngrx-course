import { AuthService } from './services/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effects/register.effect';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { PersistanceService } from '../shared/services/persistance.service';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
];

@NgModule({
    imports: [
        EffectsModule.forFeature([RegisterEffect]),
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature('auth', reducers),
        BackendErrorMessagesModule,
    ],
    providers: [AuthService, PersistanceService],
    declarations: [RegisterComponent],
})
export class AuthModule {}
