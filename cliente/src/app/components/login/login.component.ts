import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import {USER_ITEM} from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(public sessionService : SessionService, public router: Router) {
        this.sessionService.check().subscribe(data => {
           if (data != null) router.navigate(['/home']);
        });
    }
    
    ngOnInit(): void {}

    onSend(): void {
        this.sessionService.login('admin', '12345').subscribe(data => {
            localStorage.setItem(USER_ITEM, data.toString());
            this.router.navigate(['/home']);
        });
    }
}
