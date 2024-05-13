import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-update-employees',
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.scss']
})
export class UpdateEmployeesComponent {
  @Input() employee: any = {
    name: '',
    employer: '',
    position: '',
    salary: 0,
    deduction: []
  }
  constructor() {}
  ngOnInit(): void {}
  
  validateEmploy(){
    return !this.employee.name || !this.employee.employer || !this.employee.position || !this.employee.salary || this.validateDeduction();
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
  checkValue($event: any, value: any){
    if($event.target.value < 0) value = 0;
  }

}
