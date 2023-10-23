import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './authentication/login/login.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
      }, // Default route
      { 
        path: 'login', 
        component: LoginComponent 
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },

      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];
