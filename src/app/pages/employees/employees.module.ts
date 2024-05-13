import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { UpdateEmployeesComponent } from './update-employees/update-employees.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeesComponent,
    UpdateEmployeesComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatMenuModule
  ]
})
export class EmployeesModule { }

export const employeesUrls = [
  { path: 'employees', component: EmployeesComponent}
]
