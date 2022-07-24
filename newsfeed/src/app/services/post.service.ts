import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable, catchError } from 'rxjs';
import{ tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // BASE URL
  baseurl = 'http://localhost:3000/feedActivity';  

 

 constructor(private http: HttpClient) { }
 
    // GET POSTS
  GetAllFeeds(): Observable<Post[]>{
   return this.http.get<Post[]>(this.baseurl).pipe(tap((posts) => posts.sort((a,b) => b.date - a.date)));
 }

 GetSingleFeed(feedId): Observable<Post[]>{
  return this.http.get<Post[]>(`${this.baseurl}/${feedId}`)
 }

 GetSingleUserFeed(username):Observable<Post[]> {
  return this.http.get<Post[]>(this.baseurl + `?subject=${username}`)
 }
//  put like
UpdateFeedLikes(feedId, likeupdate): Observable<Post[]>{
  return this.http.put<Post[]>(`${this.baseurl}/${feedId}`, likeupdate)
}


// Post like
PostLike(userlike): Observable<any[]>{
  return this.http.post<Post[]>(this.baseurl, userlike)
}

// post comment
PostUserComment(usercomment):Observable<any[]>{
  return this.http.post<Post[]>(this.baseurl, usercomment)
}


  
}
