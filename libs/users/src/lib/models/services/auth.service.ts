import {Injectable} from '@angular/core'
import { evironment } from '@env/enviroment';


@Injectable ({
    providedIn: 'root'
})
export class AuthService {
    apiURLUsers = evironment.apiURL + 'users';
    
    constructor(private http: HttpClient) { }


    login(email: string, password:string): Observable<User>{
        return this.http.post<User>(`${this.apiURLUsers}/login`,{email:email, password:password})
    }
}