import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CustomValidators } from 'src/app/common/customvalidator';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  public urls = new APIURL();
  form!: FormGroup;
  title!: string;
  id?: string;
  isAddMode!: boolean;
  submitted = false;
  submitting = false;
  genders: any[] = [];
  departments: any[] = [];
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    console.log(this.id,'dddd');
    

    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      reportingPerson: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      createdBy: ['123', [Validators.required]],
    }, { validators: CustomValidators.passwordsMatching });



    this.title = this.isAddMode ? 'Add Employee' : 'Edit Employee';
    if (!this.isAddMode) {
      this.cService.post(this.urls.GetEmployeeById_API_URL, { id: this.id })
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
        });
    }
    this.getDepartment();
    this.getGender();
    this.getRole();
  }

  getDepartment() {
    this.cService.get(this.urls.GetDepartmentList_API_URL).subscribe(
      departments => {
        this.departments = departments;
        console.log('Departments:', this.departments);
      },
      error => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  getRole() {
    this.cService.get(this.urls.GetRoleList_API_URL).subscribe(
      roles => {
        this.roles = roles;
        console.log('Roles:', this.roles);
      },
      error => {
        console.error('Error fetching Roles:', error);
      }
    );
  }

  getGender() {
    this.cService.get(this.urls.GetGenderList_API_URL).subscribe(
      genders => {
        this.genders = genders;
        console.log('Gender:', this.genders);
      },
      error => {
        console.error('Error fetching Gender:', error);
      }
    );
  }
  
  onSelectGender(value: number) {
    let gender = value;
    console.log("gender", gender);
  }

  onSelectRole(value:number)
  {
    let role=value;
    console.log("role",role);
    
  }

  onSelectDept(value:number)
  {
    let dept=value;
    console.log("department",dept);
    
  }

  onSelectRP(value:number)
  {
    let rp=value;
    console.log("reporting",rp);
    
  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log('Submit button clicked.');
    this.submitted = true;


    if (this.form.invalid) {
      console.log('Form is invalid. Aborting submission.');
      return;
    }

    this.submitting = true;
    this.saveEmployee().subscribe((response)=>{
        console.log('Employee saved successfully.',response);
        this.router.navigateByUrl('/employee');
      },
      (error) => {
        console.log('Error saving employee:', error);
        this.submitting = false;
      }
    );
  }
 
  private saveEmployee() {
    console.log('Saving employee...');
    delete this.form.value.passwordConfirm;
    return this.id
      ? this.cService.post(this.urls.UpdateEmployee_API_URL, this.form.value)
      : this.cService.post(this.urls.CreateEmployee_API_URL, this.form.value);
  }
}
