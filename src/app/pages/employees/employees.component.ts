import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employee/employees.service';
import { UpdateEmployeesComponent } from './update-employees/update-employees.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: any = [];

  constructor(private employeesService: EmployeesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeesService.getEmployees().subscribe((res:any) => {
      this.employees = res;
    })
  }

  showAddModal() {
    const dialogRef = this.dialog.open(AddEmployeesComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.addEmployee(result);
    });
  }

  showUpdateModal(employee: any) {
    const dialogRef = this.dialog.open(UpdateEmployeesComponent);
    const instance = dialogRef.componentInstance;
    instance.employee = employee;

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.updateEmployee(result);
      }
    });
  }

  addEmployee(employee: any) {
    this.employeesService.addEmployee(employee).subscribe((res) => {
      this.loadEmployees();
    })
  }

  updateEmployee(employee: any) {
    this.employeesService.updateEmployee(employee, employee._id).subscribe((res) => {
      this.loadEmployees();
    });
  }

  showDeleteConfirm(id: any): void {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.deleteResources(id);
    });

  }

  deleteResources(id: any) {
    this.employeesService.deleteEmployee(id).subscribe((res) => {
      this.loadEmployees();
    });
  }

}
