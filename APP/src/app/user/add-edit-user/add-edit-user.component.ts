import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { APIURL } from 'src/app/services/APIURL';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId!: string;
  title!: string;
  urls = new APIURL();
  users: User[] = [];
  isLoading: boolean = true;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private cService: CommonService,private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.title = "Update User";
        this.isEditMode = true;
        this.getUserById(this.userId)
      } else {
        this.title = "Add User";
        this.isEditMode = false;
        this.isLoading=false;
      }
      this.initializeForm();
    });
  }


  initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      pin: ['', Validators.required],
      isSuper: [false],
      isActive: [false]
    });
    if (this.isEditMode) {
      this.userForm.addControl('userID', new FormControl('', Validators.required));
    }
  }

  getUserById(userID: any) {
    this.cService.get(this.urls.getUserById_API_URL + '/' + userID).subscribe({
      next: (data: User) => {
        this.userForm.patchValue({
          userID:data.userID,
          firstName: data.firstName,
          lastName: data.lastName,
          pin: data.pin,
          isSuper: data.isSuper,
          isActive: data.isActive
        });
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
  
      if (this.isEditMode) {
        // Update existing user
        userData.userID = this.userId;
        this.cService.post(this.urls.updateUser_API_URL, userData).subscribe(
          (response) => {
            this.notificationService.showSuccess('User updated successfully', 'Success');
            this.router.navigate(['/user-list']);
          },
          (error) => {
            this.notificationService.showError('Error updating user', 'Error');
          }
        );
      } else {
        // Create a new user
        this.cService.post(this.urls.addUser_API_URL, userData).subscribe(
          (response) => {
            this.notificationService.showSuccess('User added successfully', 'Success');
            this.router.navigate(['/user-list']);
          },
          (error) => {
            // const errorMessage = `Error adding user. Response: ${JSON.stringify(error)}`;
            this.notificationService.showError('Error adding user', 'Error');
          }
        );
      }
    }
  }
  

}
