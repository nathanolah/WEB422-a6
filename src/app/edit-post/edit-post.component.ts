import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: String;

  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data.getPostById(this.route.snapshot.params['id']).subscribe(data => {
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString(); // sets as a single string   
    }); 
  }
  
  formSubmit(): void {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => {
      this.router.navigate([`admin`]);
    });
  }

  deletePost(): void {
    this.data.deletePostById(this.blogPost._id).subscribe(() => {
      this.router.navigate([`admin`]);
    });
  }

}
