import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { APIURL } from 'src/app/services/APIURL';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  filteredUsers: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  urls = new APIURL();
  filterValue: string = '';
  displayedColumns: string[] = ['userID', 'firstName', 'lastName', 'pin', 'isSuper', 'isActive', 'actions'];
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cService: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.cService.postWithoutModel(this.urls.getuserList_API_URL).subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers.data = this.users;
        setTimeout(() => {
          this.isLoading = false; 
        }, 500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getUserId(userID: string) {
    this.router.navigate(['/add-edit-user', userID]);
  }

  applyFilter(filterValue: string) {
    this.filteredUsers.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.filteredUsers.paginator = this.paginator;
    this.filteredUsers.sort = this.sort;
  }
}
