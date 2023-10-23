import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(private authService: AuthService, private router: Router,private notificationService: NotificationService) {

  }

  signOut() {
    // Call the AuthService's logout method
    this.authService.logout();
    this.notificationService.showSuccess('Logout successful', 'Success');
    this.router.navigate(['/login']);

    // Perform any other sign-out-related tasks 
  }
}
