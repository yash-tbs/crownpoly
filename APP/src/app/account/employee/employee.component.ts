import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public urls = new APIURL();
  employeeList: [] = [];
  selectedId: any;
  displayedColumns = ['id', 'firstName', 'middleName', 'lastName', 'role', 'dateOfBirth', 'gender',
    'contact', 'email', 'department', 'reportingPerson', 'createdBy', 'createdDate', 'Action'];

  constructor(private cService: CommonService,private router: Router) { }
  GetEmplyeeList() {
    this.cService.postWithoutModel(this.urls.GetEmployeeList_API_URL).subscribe(
      data => {
        this.employeeList = data;
        console.log("test", this.employeeList);
      },
      err => {
        console.log(err);
      }
    )
  }
  getEmployeeId(id:string)
  {
    this.selectedId=id;
    this.router.navigate(['/add-edit-employee', this.selectedId]);
  }
  ngOnInit(): void {
    this.GetEmplyeeList();
  }

}
