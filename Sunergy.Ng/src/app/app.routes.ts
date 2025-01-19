import { Routes } from '@angular/router';
import { NavBarComponent } from './modules/core/nav-bar/nav-bar.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './modules/modals/logout/logout.component';
import { MapComponent } from './modules/map/map.component';
import { SolarPanelComponent } from './modules/solar-panel/solar-panel.component';

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
                path:'dashboard',
                component: NavBarComponent,
            },
            {
                path:'home',
                component: HomeComponent,
            },
            {
                path:'logout',
                component: LogoutComponent,
            },
            {
                path:'map',
                component: MapComponent,
            },
            {
                path: 'solar-panel/:id',
                component: SolarPanelComponent
            }
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
