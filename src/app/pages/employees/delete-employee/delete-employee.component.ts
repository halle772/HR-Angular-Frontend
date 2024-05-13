import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent {
  @Input() data: any = {
    title: 'Are you sure you want to remove this employee?',
    content: 'This action cannot be undone.',
  }
}
