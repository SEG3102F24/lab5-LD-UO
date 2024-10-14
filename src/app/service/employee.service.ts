import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Employee } from "../model/employee";
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);

  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);

  // get $(): Observable<readonly Employee[]> {
  //   return this.employees$;
  // }

  getEmployees(): Observable<Employee[]> {
    const employees = collection(this.firestore, 'employees');
    return collectionData(employees) as Observable<Employee[]>
  }

  addEmployee(employee: Employee) {
    const employees = collection(this.firestore, 'employees');
    delete employee.id;
    return addDoc(employees, { ...employee });
  }
}
