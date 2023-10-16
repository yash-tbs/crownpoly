import { Routes } from "@angular/router";
import { EmployeeComponent } from "./employee/employee.component";
import { AddEditEmployeeComponent } from "./add-edit-employee/add-edit-employee.component";


export const EmplyeeRoutes: Routes = [
    {
        path: 'employee',
        component: EmployeeComponent
    },
    {
        path: 'add-edit-employee',
        component: AddEditEmployeeComponent
    },
    {
        path: 'add-edit-employee/:id',
        component: AddEditEmployeeComponent
    }
];
