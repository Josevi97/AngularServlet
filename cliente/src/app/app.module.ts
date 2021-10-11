import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SessionService } from './services/session.service';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {SessionResolver} from './resolvers/session.resolver';
import { SecretComponent } from './components/secret/secret.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SecretComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
    providers: [
        SessionService,
        SessionResolver
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}
