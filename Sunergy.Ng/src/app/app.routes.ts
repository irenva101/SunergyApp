import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/core/dashboard/dashboard.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: RegisterComponent,
    },
    {
        path:'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];
