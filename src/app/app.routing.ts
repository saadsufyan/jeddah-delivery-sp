import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PassCodeComponent } from './pages/forgot-password/pass-code/pass-code.component';
import { ResetPasswordComponent } from './pages/forgot-password/reset-password/reset-password.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  },
]},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent },
  {
    path: 'verify-password',
    component: PassCodeComponent },
  {
    path: 'reset-password',
    component: ResetPasswordComponent },
  {
    path: '**',
    redirectTo: 'category'
  }
]
