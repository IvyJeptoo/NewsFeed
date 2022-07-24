import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
  UsersList: any = [];

  @Output()
  userName = new EventEmitter<string>(); 
  allFeeds = new EventEmitter<any>();

  

  constructor(
    public userService: UserService,
    public postService: PostService
  ) { }
  

  ngOnInit(): void {
    this.userService.GetAllUsers().subscribe(res => this.UsersList = res) 

  }
  getUser(index: number) {
    let userName = this.UsersList[index].username;
    this.userName.emit(userName)    
  }
  getFeeds(){
    this.allFeeds.emit(this.allFeeds)

  }
  

}
