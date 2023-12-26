import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { evironment } from '@env/enviroment';
import * as countriesLib from 'i18n-iso-countries';

@Injectable({
    providedIn:'root'
})
export class UserService {
    apiURLUser = evironment.apiURL + 'users';

    constructor(private http: HttpClient) {
        countriesLib.registerLocale(require('i-18n-iso-countries/langs/en.json'))

    }
    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.apiURLUser);
    
    }

    getUsers(userId: string): Observable<User[]>{
        return this.http.get<User[]>(`$this.apiURLUser)/${userId}`);
    }
    createUsers(user: User): Observable<User>{
        return this.http.post<User>(this.apiURLUser, user);
    
    }
    updateUsers(user: User): Observable<User>{
        return this.http.put<User>(`$this.apiURLUser)/${user.id}`, user);
    }
    deleteUsers(userId: String): Observable<any>{
        return this.http.delete<any>(`$this.apiURLUser)/${userId}`);
    }
    getCountries(): {id: string; name:string }[] {
        return Object.entries(countriesLib.getNames('en', {select: 'official'})).map ((entry) => {
            return {
                id: entry[0],
                name: entry [1]
            };
        })

    }

    getCountry (countryKey: string): string{
        return countriesLib.getName(countryKey,'en');
    }
        
    }
    

