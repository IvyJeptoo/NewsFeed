import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
  UsersList: any = [];



  constructor(
    public userService: UserService
  ) { }

  

  ngOnInit(): void {
    this.userService.GetAllUsers().subscribe(res => this.UsersList = res)
  }

}
