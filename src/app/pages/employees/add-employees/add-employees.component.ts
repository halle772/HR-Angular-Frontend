import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss']
})
export class AddEmployeesComponent implements OnInit {
  employee = {
    name: '',
    employer: '',
    position: '',
    salary: 0,
    deduction: 0,
  }
  constructor() {}
  ngOnInit(): void {}
  
}
