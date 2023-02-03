import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  UsersList: any = [];
  private userSubscription;

  @Output() userName = new EventEmitter<string>();
  @Output() allFeeds = new EventEmitter();


  constructor(
    private userService: UserService,
    private toastr: ToastrService

  ) { }

  
  getAllUsers(){
    this.userSubscription = this.userService.GetAllUsers()
    .pipe(first())
    .subscribe((res) => {
      this.UsersList = res
    },
    (err) => {      
      this.showError();
      
    }
    )
  }

  getUser(index: number) {
    let userName = this.UsersList[index].username;
    this.userName.emit(userName)
  }
  getFeeds() {
    this.allFeeds.emit()
  }
  showError() {
    this.toastr.error('An error occured please try again later', 'Error');
  }

  ngOnInit(): void {
    this.getAllUsers()
    
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
    
  }


}
