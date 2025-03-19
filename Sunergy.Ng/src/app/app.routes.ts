import { Routes } from '@angular/router';
import { NavBarComponent } from './modules/core/nav-bar/nav-bar.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './modules/modals/logout/logout.component';
import { SolarPanelComponent } from './modules/solar-panel/solar-panel.component';
import { AuthGuard } from './services/guards/auth.guard';
import { PanelSetupComponent } from './panel-setup/panel-setup.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { MapComponent } from './modules/map/map.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'register', 
        pathMatch: 'full', 
    },
    {
        path: '',
        component: PrivateLayoutComponent,
        canActivate: [AuthGuard],
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
            },
            {
                path: 'panel-setup',
                component: PanelSetupComponent
            },
            {
                path: 'dashboard-admin',
                component: DashboardAdminComponent
            },
            {
                path: 'test',
                component: TestComponent
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
