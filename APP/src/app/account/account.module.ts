import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmplyeeRoutes } from './account.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { DemoMaterialModule } from '../demo-material-module';
import { EmployeeComponent } from './employee/employee.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmplyeeRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DemoMaterialModule,
  ],
  providers: [],
  declarations: [
    EmployeeComponent,
    AddEditEmployeeComponent   
  ]
})
export class AccountModule { }
