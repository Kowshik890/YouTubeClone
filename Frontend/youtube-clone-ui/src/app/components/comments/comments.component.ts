import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentDTO } from 'src/app/datatransferobject/comment-dto';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  videoId!: string;
  commentsForm: FormGroup;
  commentDTO: CommentDTO[] = [];

  constructor(private userService: UserService, private commentService: CommentService, private matSnackBar: MatSnackBar) { 
    this.commentsForm = new FormGroup({
      comment: new FormControl('comment'),
    });
  }

  ngOnInit(): void {
    this.getAllComments();
  }

  postComment() {
    const comment = this.commentsForm.get('comment')?.value;
    const commentDTO = {
      "commentText": comment,
      "authorId": this.userService.getUserId()
    }
    
    this.commentService.postComment(commentDTO, this.videoId).subscribe(response => {
      this.matSnackBar.open("Comment Posted Successfully.", "OK");
      this.commentsForm.get('comment')?.reset();
      this.getAllComments();
    })
  }

  getAllComments() {
    this.commentService.getAllComments(this.videoId).subscribe(response => {
      this.commentDTO = response;
  })
  }

}
