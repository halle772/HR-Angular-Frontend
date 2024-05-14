import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss']
})
export class AddEmployeesComponent implements OnInit {
  employee: any = {
    name: '',
    employer: '',
    position: '',
    deduction: []
  }

  errors: any = {
    name: false,
    employer: false,
    position: false,
    salary: false,
    deduction: [],
    requiredDeduction: false,
    pay: false,
    noError() {
      return this.name || this.employer || this.position || this.salary || this.deduction.includes(true) || this.pay || this.requiredDeduction; 
    }
  }

  constructor(public dialogRef: MatDialogRef<AddEmployeesComponent>) {}
  ngOnInit(): void {}

  validateEmploy(){
    this.errors.name = !this.employee.name;
    this.errors.employer = !this.employee.employer;
    this.errors.position = !this.employee.position;
    this.errors.salary = !this.employee.salary || this.employee.salary <= 0;
    this.errors.deduction = this.employee.deduction.map((deduction: any) => !deduction.name || !deduction.value);
    this.errors.requiredDeduction = this.employee.deduction.length < 1;  
    this.errors.pay = (Number.isNaN(this.calCulateSalary())) || (this.calCulateSalary() <= 0);
    return this.errors.noError();
  }

  validateDeduction(){
    return this.employee?.deduction.length 
    ? this.employee.deduction.some((deduction: any) => !deduction.name || !deduction.value)
    : true;
  }

  addDeduction(){
    this.employee.deduction.push({name: '', value: ""});
  }

  removeItem(index: number){
    this.employee.deduction.splice(index, 1);
  } 

  calCulateSalary(){
    let totalDeduction = 0;
    this.employee.deduction.forEach((deduction: any) => {
      totalDeduction += deduction.value;
    });
    return this.employee.salary - totalDeduction;
  }

  checkValue($event: any, value: any, key: any ){
    if($event.target.value < 0) value[key] = '';
  }

  saveEmployee() {
    if(!this.validateEmploy()) {
      this.dialogRef.close(this.employee);
    }
  }
  
}
