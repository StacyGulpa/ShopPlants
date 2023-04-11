import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authservice';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

  export class LoginComponent {
    email = '';
    password = '';
    constructor(private authService: AuthService) {}
  
    login(email: string, password: string) {
      this.authService.login(email, password).subscribe((loggedIn) => {
        if (loggedIn) {
          console.log('User logged in:', email);
        } else {
          console.log('Invalid email or password');
        }
      });
    }
    
  }

  
  
  
