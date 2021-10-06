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
    ],
    providers: [AuthService],
    declarations: [RegisterComponent],
})
export class AuthModule {}
