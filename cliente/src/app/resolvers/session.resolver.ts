import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

@Injectable()
export class SessionResolver implements Resolve<Observable<String>> {
    constructor(private sessionService: SessionService, private router: Router) {}

    resolve(): Observable<String> {
        const session = this.sessionService.check().pipe(
            catchError(error => {
                return of(error.message);
            })
        );

        session.subscribe(data => {
            if (data == null) {
                console.log(this.router.url);
                if (this.router.url != '/login')
                    this.router.navigate(['/login']);
            }
        });

        return session;
    }
}
