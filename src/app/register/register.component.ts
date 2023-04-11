import { Component } from '@angular/core';
import { AuthService } from '../authservice';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name!: string;
  email!: string;
  password!: string;
  files!: FileList;

  constructor(private authService: AuthService) {}

  register(name: string, email: string, password: string) {
    this.authService.register(name, email, password, this.files).subscribe(() => {
      console.log('User registered:', name, email, password);
    });
  }
}

