import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, shareReplay, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { API_URI, environment, httpOptions } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private sURI: String;
    
    constructor(private http: HttpClient) {
        this.sURI = `${API_URI}/session`;
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = error.error instanceof ErrorEvent ?
            error.error.message :
            `Error status: ${error.status}: Error message: ${error.message}`;

        if (!environment.production) console.log(`SessionService: ErrorHandle: ${errorMessage}`);
        return throwError(errorMessage);
    }

    login(username: String, password: String): Observable<String> {
        if (!environment.production) console.log('SessionService: Login: Trying to create session on the server side');
        const data = JSON.stringify({ username:username, password:password });

        return this.http.post<String>(`${this.sURI}`, data, httpOptions)
            .pipe(
                tap((u: String) => console.log(u)),
                retry(1),
                catchError(this.handleError)
            );
    }

    check(): Observable<String> {
        if (!environment.production) console.log('SessionService: Check: Trying to check the current session on the serve side');

        return this.http.get<String>(`${this.sURI}?op=check`, httpOptions)
            .pipe(
                tap((u: String) => console.log(u)),
                shareReplay(),
                catchError(this.handleError)
            );
    }

    get(): Observable<String> {
        if (!environment.production) console.log('SessionService: Get: Trying to get the current session secret');

        return this.http.get<String>(`${this.sURI}?op=get`, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    logout(): Observable<String> {
        if (!environment.production) console.log('SessionService: Logout: Trying to clean the current session on the serve side');

        return this.http.delete<String>(`${this.sURI}`, httpOptions)
            .pipe(
                tap((u: String) => console.log(u)),
                catchError(this.handleError)
            );
    }
}
