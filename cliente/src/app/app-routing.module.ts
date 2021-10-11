import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {SecretComponent} from './components/secret/secret.component';
import {SessionResolver} from './resolvers/session.resolver';

const routes: Routes = [
    {
        path: 'home', 
        component: HomeComponent,
        resolve: { message: SessionResolver }
    },
    {
        path: 'secret', 
        component: SecretComponent,
        resolve: { message: SessionResolver }
    },
    {
        path: 'login', 
        component: LoginComponent,
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
