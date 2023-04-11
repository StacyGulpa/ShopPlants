import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { DataService } from './dataservice';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private dataService: DataService) {}

  register(name: string, email: string, password: string, files: FileList): Observable<any> {
    const user = { name, email, password, token: 'random_token' };
    const users = this.getUsersFromLocalStorage();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return this.dataService.saveData(user, files);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.dataService.getData().pipe(
      map((data: User[]) => {
        const user = data.find(user => user.email === email && user.password === password);
        if (user) {
          localStorage.setItem('authToken', user.token);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private getUsersFromLocalStorage(): User[] {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users;
  }
}