import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // BASE URL
  baseurl = 'http://localhost:3000';  

 

 constructor(private http: HttpClient) { }
 
    // GET POSTS
  GetAllPosts(): Observable<Post[]>{
   return this.http.get<Post[]>(this.baseurl + '/feedActivity')
 }

  
}
