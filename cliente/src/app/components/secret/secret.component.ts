import { Component, OnInit } from '@angular/core';
import {SessionService} from 'src/app/services/session.service';

@Component({
    selector: 'app-secret',
    templateUrl: './secret.component.html',
    styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {
    public secret: String;

    constructor(private sessionService: SessionService) {
        this.sessionService.get().subscribe(data => {
            this.secret = data;
        });
    }

    ngOnInit(): void {}
}
