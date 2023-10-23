// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  firstName: string = '';
  pin: string = '';

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  login(): void {
    if (this.firstName && this.pin) {
      this.authService.login(this.firstName, this.pin).subscribe({
        next: (result) => {
          this.notificationService.showSuccess('Login successful', 'Success');
          this.router.navigate(['/user-list']);
        },
        error: (error) => {
          this.notificationService.showError('Login failed', 'Error');
        }
      });
    } else {
      console.error('Username and password are required.');
    }
  }
}
