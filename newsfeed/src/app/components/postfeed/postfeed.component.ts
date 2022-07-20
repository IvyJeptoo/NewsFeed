import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit {
  numberOfLikes: number = 0;

  likeOnClick(){
    this.numberOfLikes++;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
