import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { NavigationComponent } from './Navigation/navigation.component';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

const authorisedRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: authorisedRoutes,
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
