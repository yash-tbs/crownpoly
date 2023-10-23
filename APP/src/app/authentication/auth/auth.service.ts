import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { APIURL } from '../../services/APIURL';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  public urls = new APIURL();

  constructor(private cService: CommonService) {
    // Check if the user is already authenticated on application startup
    this.isAuthenticated = this.checkIfAuthenticated();
  }

  login(firstName: string, pin: string): Observable<boolean> {
    const loginData = {
      firstName: firstName,
      pin: pin,
    };
    
    // Make the login API call
    return this.cService.post(this.urls.loginUser_API_URL, loginData)
      .pipe(
        map((data: any) => {
          this.isAuthenticated = true;
          // Save the token in local storage
          localStorage.setItem('auth', JSON.stringify({ token: data.token }));
          return true; // Return true if the login was successful
        }),
        catchError((error: any) => {
          return of(false); // Return false if the login failed
        })
      );
  }

  private checkIfAuthenticated(): boolean {
    const authData = localStorage.getItem('auth');
    if (authData) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    // Remove the token from local storage
    localStorage.removeItem('auth');
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
