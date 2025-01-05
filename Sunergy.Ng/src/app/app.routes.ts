import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/core/dashboard/dashboard.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'register', 
        pathMatch: 'full', 
    },
    {
        path: '',
        component: PrivateLayoutComponent,
        children: [
            {
                path:'home',
                component: HomeComponent,
            },
        ],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent
    },
];
