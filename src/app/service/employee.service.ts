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

  get $(): Observable<readonly Employee[]> {
    const employees = collection(this.firestore, 'employees');
    console.log(employees)
    return collectionData(employees, {idField: 'id'}) as Observable<Employee[]>;
  }
    
  addEmployee(employee: Employee) {
    const employees = collection(this.firestore, 'employees');
    delete employee.id;
    return addDoc(employees, { ...employee });
  }
}
