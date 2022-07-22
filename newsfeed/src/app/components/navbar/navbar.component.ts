import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable, catchError } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {

  // BASE URL
  baseurl = 'http://localhost:3000';

  UsersList: any = [];

  constructor(
    public userService: UserService,
    private http: HttpClient
  ) { }
  

  ngOnInit(): void {
    this.userService.GetAllUsers().subscribe(res => this.UsersList = res) 

  }

  // getUser(index: number){
  //   console.log(this.UsersList[index].username);
    
  // }
  getUser(index: number):Observable<User[]> {
    return this.http.get<User[]>(this.baseurl + `/feedActivity?subject=${this.UsersList[index].username}`)
  }
  

}
