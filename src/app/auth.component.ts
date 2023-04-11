import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map(response => {
          // сохраняем токен авторизации в локальном хранилище
          localStorage.setItem('authToken', response.token);
          return true;
        })
      );
  }

  logout(): void {
    // удаляем токен авторизации из локального хранилища
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    // проверяем наличие токена авторизации в локальном хранилище
    return !!localStorage.getItem('authToken');
  }
}