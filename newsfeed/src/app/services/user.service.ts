import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BASE URL
  baseurl = 'https://zerakinewsfeedapi.herokuapp.com/users';


  constructor(private http: HttpClient) { }

  // GET ALL USERS
  GetAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseurl);
  }



}
