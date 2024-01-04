import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  apiURLUsers = environment.apiUrl + 'users';
  constructor(private http: HttpClient) { }

  getUsersCount(): Observable<{userCount: number}> {
    return this.http.get<{userCount: number}> (`${this.apiURLUsers}/get/count`).pipe();
    
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }
  getUser(userId: string): Observable<User>{
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }

 updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  }

  
 deleteUser(userId: string): Observable<any> {
   return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
 }


}
