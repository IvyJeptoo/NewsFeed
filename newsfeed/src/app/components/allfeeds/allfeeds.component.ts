import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { RandomuserService } from '../../services/randomuser.service';

@Component({
  selector: 'app-allfeeds',
  templateUrl: './allfeeds.component.html',
  styleUrls: ['./allfeeds.component.css']
})
export class AllfeedsComponent implements OnInit {
  // random user
  randomuser: any;

   // feed
   postList: any = [];

  // Comment modal toggle
  isShowComment=true;
  toggleDisplay(){
    this.isShowComment=!this.isShowComment
  }
  // comment functionality
  comment = "";
  commentList = [];
  postComment(){
    this.commentList.push(this.comment);
    this.comment = "";


  }
  
  // like 
  numberOfLikes: number = 0;
  
  

  constructor(
    private postService: PostService,
    private randomuserService: RandomuserService
    ) { }

  ngOnInit(): void {
    this.postService.GetAllPosts().subscribe(res => this.postList = res)
    this.randomuserService.getRandomUser().subscribe(
      (data:any) => {
        this.randomuser = data.results[0];
        console.log(this.randomuser);
        
      }
    );
        
  }
  likeCount(){
    this.numberOfLikes++;
  }
  likeOnClick(index: number){
    
    
    let userlike = {

      "userId": "",
      "subject": this.randomuser.name.first,      
      "action": "liked",
      "owner": `${this.postList[index].subject}'s`,
      "upvote": "",
      "object": this.postList[index].object,     
      "date": Date.now(),
    }
    this.postList.unshift(userlike);
  }

}
