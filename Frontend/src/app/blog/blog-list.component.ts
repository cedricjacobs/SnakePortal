import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { BlogService } from './blog.service';
import { BlogPost } from '../_models/blogpost';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
    moduleId: module.id,
    selector: 'blog',
    templateUrl: 'templates/blog-list.component.html'
})
export class BlogListComponent implements OnInit {
    constructor(private blogService: BlogService,private router: Router) { }
    blogPosts: Observable<Array<BlogPost>>;
    errorMessage: string;
    ngOnInit() {
         var s = this.blogService.getAllBlogPosts();
         s.subscribe(
             posts=>this.blogPosts=posts,
             error => this.errorMessage = <any>error
         );
        console.log(JSON.stringify(this.blogPosts));
    }
    viewDetails(b:BlogPost){
        this.router.navigate(['blog/view/',b.Id]);
    }
    createNewPost(){
      this.router.navigate(['blog/edit/',0]);  
    }

}