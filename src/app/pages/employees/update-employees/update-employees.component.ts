import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-update-employees',
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.scss']
})
export class UpdateEmployeesComponent {
  @Input() employee = {
    name: '',
    employer: '',
    position: '',
    salary: 0,
    deduction: 0
  }
  constructor() {}
  ngOnInit(): void {}
}
