import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent], 
  imports: [
    CommonModule,
     AuthenticationRoutingModule,
     MatCardModule,
     FlexLayoutModule,
     MatFormFieldModule,
     MatInputModule,
     MatCheckboxModule,
     FormsModule
    ], 
})
export class AuthenticationModule {}
