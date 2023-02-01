import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable,throwError } from 'rxjs/';
import { tap, catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class PostService {
  // BASE URL
  baseurl = 'http://localhost:3000/feedActivity';


  constructor(private http: HttpClient) { }

  // GET REQUESTS
  GetAllFeeds(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseurl).pipe(tap((posts) => posts.sort((a, b) => b.date - a.date)));
  }
  GetSingleFeed(feedId): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseurl}/${feedId}`)
  }

  GetSingleUserFeed(username): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseurl + `?subject=${username}`)
  }

  //  PUT REQUESTS
  UpdateFeed(feedId: any, update: any): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/${feedId}/`, update)
  }
  
  // POST REQUESTS
  PostActivity(user): Observable<any[]> {
    return this.http.post<Post[]>(this.baseurl, user)
  }

}
