import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employee/employees.service';
import { UpdateEmployeesComponent } from './update-employees/update-employees.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { Debounce } from 'src/app/utils/debounce';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: any = [];
  ascSort = '';
  searchValue: string = '';

  constructor(private employeesService: EmployeesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeesService.getEmployees(this.searchValue).subscribe((res:any) => {
      this.employees = res.map((value: any, key: number)=> ({...value, id: key + 1}));
    })
  }

  showAddModal() {
    const dialogRef = this.dialog.open(AddEmployeesComponent, {
      panelClass: 'mobile-responsive-modal',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.addEmployee(result);
    });
  }

  showUpdateModal(employee: any) {
    const dialogRef = this.dialog.open(UpdateEmployeesComponent, {
      panelClass: 'mobile-responsive-modal',
    });
    const instance = dialogRef.componentInstance;
    instance.employee = structuredClone(employee);

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
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      panelClass: 'mobile-responsive-modal',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.deleteResources(id);
    });

  }

  deleteResources(id: any) {
    this.employeesService.deleteEmployee(id).subscribe((res) => {
      this.loadEmployees();
    });
  }

  sortNames(type: string) {
    if(type == 'Name (A-Z)') {
      this.ascSort = type;
      this.employees.sort((a:any, b: any) => a.name.localeCompare(b.name));
    } else if(type == 'Name (Z-A)') {
      this.ascSort = type;
      this.employees.sort((a:any, b: any) => b.name.localeCompare(a.name));
    } else if (type == 'Salary (L-H)'){
      this.ascSort = type;
      this.employees.sort((a:any, b: any) => a.salary - b.salary);
    } else if (type == 'Salary (H-L)'){
      this.ascSort = type;
      this.employees.sort((a:any, b: any) => b.salary - a.salary);
    }
  }

  calculateDeduction(employee: any) {
    let totalDeduction = 0;
    employee.deduction.forEach((deduction: any) => {
      totalDeduction += deduction.value;
    });
    return totalDeduction ? totalDeduction : 0;
  }

  calculateSalary(employee: any) {
    let totalDeduction = 0;
    employee.deduction.forEach((deduction: any) => {
      totalDeduction += deduction.value;
    });
    return employee.salary - (totalDeduction ? totalDeduction : 0);
  }

  @Debounce(300)
  search() {
    this.loadEmployees();
  }

}
