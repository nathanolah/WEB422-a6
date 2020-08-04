import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../comment';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {

  post: BlogPost;
  querySub: any;
  commentName: String;
  commentText: String;
  comment: Comment = new Comment();
  
  constructor(private data: PostService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      this.data.getPostById(params['id']).subscribe(data => {
        this.post = data;
        this.post.views++;
        this.data.updatePostById(this.post._id, this.post).subscribe();
      });
    });
  }

  ngOnDestroy() {
    if(this.querySub) this.querySub.unsubscribe();
  }

  submitComment(): void {
    this.comment.author = <string>this.commentName;
    this.comment.comment = <string>this.commentText;
    this.comment.date = new Date().toLocaleDateString();
    this.post.comments.push(this.comment);
    this.data.updatePostById(this.post._id, this.post).subscribe();

    // Reset to empty state
    this.commentName = "";
    this.commentText = "";

    // Reload the page
    window.location.reload();
  }

}
