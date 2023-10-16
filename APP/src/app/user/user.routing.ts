import { Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { AddEditUserComponent } from "./add-edit-user/add-edit-user.component";



export const UserRoutes: Routes = [
    {
        path: 'user-list',
        component: UserListComponent
    },
    {
        path: 'add-edit-user',
        component: AddEditUserComponent
    },
    {
        path: 'add-edit-user/:id',
        component: AddEditUserComponent
    }
];
