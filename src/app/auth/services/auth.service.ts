import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthResponseInterface } from './../types/authResponse.interface';
import { CurrentUserInterface } from './../../shared/types/currentUser.interface';
import { RegisterRequestInterface } from './../types/registerRequest.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/api/users';
        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map((response: AuthResponseInterface) => response.user));
    }
}
