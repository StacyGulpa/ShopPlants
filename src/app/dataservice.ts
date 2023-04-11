import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:2400/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  saveData(data: any, files: FileList | null): Observable<any> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files.item(i) as Blob);
      }
    }
    return this.http.post(`${this.apiUrl}`, formData);
  }
}