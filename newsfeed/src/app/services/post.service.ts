import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs/';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  

  constructor(private http: HttpClient) { }

  // GET REQUESTS
  GetAllFeeds(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/feed-activity`);
  }
  
  GetSingleFeed(feedId): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/feed-activity/${feedId}`)
  }

  GetSingleUserFeed(username): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/feed-activity?subject=${username}`)
  }

  //  PUT REQUESTS
  UpdateFeed(feedId: any, update: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/feed-activity/${feedId}/`, update)
  }
  
  // POST REQUESTS
  PostActivity(user): Observable<any[]> {
    return this.http.post<Post[]>(`${environment.apiUrl}/feed-activity`, user)
  }

}
