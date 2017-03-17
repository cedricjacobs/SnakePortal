import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../_models/blogpost';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from './blog.service';
import { AlertService } from "../_shared/alert.service";

/**
 * to-do: integrate edit view & back links
 */
@Component({
    moduleId: module.id,
    selector: 'blog-detail-view',
    templateUrl: 'templates/blog-detail-view.component.html'
})
export class BlogDetailViewComponent implements OnInit {

    blogPost: BlogPost;
    constructor(private bs: BlogService
        , private activatedRoute: ActivatedRoute
        , private router: Router
        , private alertService: AlertService) { }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
           var s = this.bs.getSpecificBlogPost(id);
            s.subscribe(
                data => this.blogPost = data, error => { this.alertService.error(error); });
                                
                                console.log('entered...');
                                console.log(JSON.stringify(this.blogPost));
            
        }
        else {
            console.log("Invalid id. Routing home...")
            this.router.navigate(['']);
        }

    }
    goBack() {
        this.router.navigate(['']);
    }
    edit(b:BlogPost) {
        this.router.navigate(['blog/edit',b.Id]);
    }

}