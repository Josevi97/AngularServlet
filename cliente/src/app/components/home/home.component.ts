import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from 'src/app/services/session.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private sessionService: SessionService, private router: Router) { }

    ngOnInit(): void {}

    moveToSecret() {
        this.router.navigate(['/secret']);
    }

    logout(): void {
        this.sessionService.logout().subscribe(() => {
            localStorage.clear();
            this.router.navigate(['/login']);
        });
    }
}
