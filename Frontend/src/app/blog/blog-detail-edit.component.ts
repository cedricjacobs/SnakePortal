import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogPost } from "../_models/blogpost";
import { BlogService } from "./blog.service";
import { AlertService } from "../_shared/alert.service";
import { ActivatedRoute, Router } from "@angular/router";

/**
 * Status: In progress
 * To-do: integrate reactive form & back links
 */
@Component({
    moduleId: module.id,
    selector: 'blog-detail-edit',
    templateUrl: 'templates/blog-detail-edit.component.html'
})
export class BlogDetailEditComponent implements OnInit {

    blogEditForm: FormGroup;
    blogPost: BlogPost;
    formTitle: any = 'title';
    constructor(private fb: FormBuilder,
        private bs: BlogService
        , private activatedRoute: ActivatedRoute
        , private router: Router
        , private alertService: AlertService) {
        this.blogEditForm = fb.group({
            title: ['', [Validators.required, Validators.minLength(10)]],
            message: ['', [Validators.required, Validators.minLength(30)]]
        })
    }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params["id"] !== "0") {

            var id = +this.activatedRoute.snapshot.params["id"];
            if (id) {
                var s = this.bs.getSpecificBlogPost(id);
                s.subscribe(
                    data => {this.blogPost = data
                        this.blogEditForm.patchValue({
                    title: this.blogPost.Title,
                    message: this.blogPost.Message
                }) }, 
                    
                    error => { this.alertService.error(error); });

                console.log('entered...');
                console.log(JSON.stringify(this.blogPost));

                this.formTitle = "Edit post"
            }
            else {
                console.log("Invalid id. Routing home...")
                this.router.navigate(['']);
            }
        }
        else {
            this.formTitle = "Write new post"
        }

    }

    save() {
        console.log(this.blogEditForm);
        console.log('Saved: ' + JSON.stringify(this.blogEditForm.value));
    }
}