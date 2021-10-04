import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
    declarations: [RegisterComponent],
})
export class AuthModule {}
