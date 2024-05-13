import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authUrls } from './pages/auth/auth.module';
import { employeesUrls } from './pages/employees/employees.module';

const routes: Routes = [
  ...authUrls,
  ...employeesUrls,
  { path: '', redirectTo: 'employees', pathMatch: 'full'},
  { path: '**', redirectTo: 'employees'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
