import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  constructor() {}
  ngOnInit(): void {}

  validateEmploy(){
    return !this.employee.name || !this.employee.employer || !this.employee.position || !this.employee.salary || this.validateDeduction();
  }

  validateDeduction(){
    return this.employee?.deduction.length 
    ? this.employee.deduction.some((deduction: any) => !deduction.name || deduction.value === undefined || deduction.value === null || deduction.value === '')
    : false;
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
  
}
