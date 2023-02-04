import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs';
import { PostService } from '../../services/post.service';
import { RandomuserService } from '../../services/randomuser.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allfeeds',
  templateUrl: './allfeeds.component.html',
  styleUrls: ['./allfeeds.component.css'],
})
export class AllfeedsComponent implements OnInit, OnDestroy {
  randomuser: any;
  postList: any = [];
  username: string;
  commentList: any[];
  likeFeedArray: any[];
  commentFeedArray: any[];
  singleFeed: any = {};
  comment: string = '';
  private allFeedsSubscription;
  private updateLikeSubscription;
  private updateCommentSubscription;
  private randomUserSubscription;
  private singleUserFeedSubscription;

  constructor(
    private postService: PostService,
    private randomuserService: RandomuserService,
    private toastr: ToastrService
  ) {}

  // gets all the feed
  allFeeds() {
    this.allFeedsSubscription = this.postService
      .GetAllFeeds()
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.postList = res.sort((a, b) => b.date - a.date);
        },
        (err) => {
          this.showError();
        }
      );
  }

  userFeedFunction(valueEmitted) {
    this.username = valueEmitted;
    this.singleUserFeedSubscription = this.postService
      .GetSingleUserFeed(this.username)
      .pipe(first())
      .subscribe(
        (res) => {
          this.postList = res;
        },
        (err) => {
          this.showError();
        }
      );
  }

  // get random user
  getRandomUser() {
    this.randomUserSubscription = this.randomuserService
      .getRandomUser()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.randomuser = data.results[0];
        },
        (err) => {
          this.showError();
        }
      );
  }

  //post randomuser  comment alert
  postComment(index: number) {
    let idFeed = this.postList[index].id;
    let usercomment = {
      subject: this.randomuser.name.first,
      action: 'commented on',
      owner: `${this.postList[index].subject}'s`,
      info: '',
      message: this.comment,
      object: this.postList[index].object,
      date: Date.now(),
    };
    //  random user comment
    this.postService
      .PostActivity(usercomment)
      .pipe(first())
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.showError();
          console.log(err);
          
        }
      );

    //  updates random user comment on the feed
    this.updateCommentSubscription = this.postService
      .GetSingleFeed(idFeed)
      .pipe(first())
      .subscribe(
        (res) => {
          let randomcommentor = this.randomuser.name.first;
          this.singleFeed = res;
          this.commentFeedArray = this.singleFeed.comments;
          this.commentFeedArray.push({
            comment: this.comment,
            commenter: randomcommentor,
          });

          let comments = this.commentFeedArray;

          let userCommentUpdate = {
            subject: this.singleFeed.subject,
            action: this.singleFeed.action,
            object: this.singleFeed.object,
            image: this.singleFeed.image,
            date: this.singleFeed.date,
            likes: this.singleFeed.likes,
            comments: comments,
          };

          this.postService
            .UpdateFeed(idFeed, userCommentUpdate)
            .pipe(first())
            .subscribe(
              (res) => {
                console.log(res);
                this.allFeeds();
              },
              (err) => {
                this.showError();
                console.log(err);
                
              }
            );
          this.comment = '';
        },
        (err) => {
          console.log(err);
          
        }
      );
  }

  // random user like
  likeOnClick(index: number) {
    //get liked feed by id
    let idFeed = this.postList[index].id;
    let userlike = {
      subject: this.randomuser.name.first,
      action: 'liked',
      owner: `${this.postList[index].subject}'s`,
      upvote: '',
      object: this.postList[index].object,
      date: Date.now(),
    };

    this.postService
      .PostActivity(userlike)
      .pipe(first())
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.showError();
        }
      );

    // update like on feed
    this.updateLikeSubscription = this.postService
      .GetSingleFeed(idFeed)
      .pipe(first())
      .subscribe(
        (res) => {
          this.singleFeed = res;
          this.likeFeedArray = this.singleFeed.likes;
          let randomliker = this.randomuser.name.first;
          this.likeFeedArray.push(randomliker);
          let likes = this.likeFeedArray;

          let userLikeUpdate = {
            subject: this.singleFeed.subject,
            action: this.singleFeed.action,
            object: this.singleFeed.object,
            image: this.singleFeed.image,
            owner: this.singleFeed.owner,
            date: this.singleFeed.date,
            likes: likes,
            comments: this.singleFeed.comments,
          };

          this.postService
            .UpdateFeed(idFeed, userLikeUpdate)
            .pipe(first())
            .subscribe(
              (res: any) => {
                console.log(res);

                this.allFeeds();
              },
              (err) => {
                this.showError();
              }
            );
        },
        (err) => {
          this.showError();
        }
      );
  }
  showError() {
    this.toastr.error('An error occured please try again later', 'Error');
  }
  ngOnInit(): void {
    this.allFeeds();
    this.getRandomUser();
  }
  ngOnDestroy() {
    this.allFeedsSubscription.unsubscribe();
    this.updateLikeSubscription.unsubscribe();
    this.updateCommentSubscription.unsubscribe();
    this.randomUserSubscription.unsubscribe();
    this.singleUserFeedSubscription.unsubscribe();
  }
}
