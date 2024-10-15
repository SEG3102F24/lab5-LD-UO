import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from "../service/employee.service";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent implements OnInit {
  protected employeeService: EmployeeService = inject(EmployeeService);
  employees: Employee[] = [];
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data.map(e => {
        let timestamp = e.dateOfBirth.toString().substring(18, 28);
        let timeStampNumber = (Number(timestamp) + 3600 * 4) * 1000;
        let date = new Date(timeStampNumber);
        e.dateOfBirth = date;
        return { ...e } as Employee;
      });
    });
  }
}
