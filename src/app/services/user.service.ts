import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.getUsers().pipe(
      map(users => users.find((user: User) => user.id == id))
    );
  }

  deleteUserById(id: number): Observable<any[]> {
    return this.getUsers().pipe(
      map(users => users.filter((user: User) => user.id !== id))
    );
  }
}