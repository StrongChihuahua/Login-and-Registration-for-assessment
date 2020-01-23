import { Component, OnInit, TemplateRef  } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { PostService } from '../_services/post.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SocketIOService } from '../_services/socket-io.service';




@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.component.html',
  styleUrls: ['./home-auth.component.css']
})
export class HomeAuthComponent implements OnInit {

  first_name: string;
  last_name: string;
  username: string;
  _id: string;

  test: any;

 posts = [];

  
  modalRef: BsModalRef;
  errors: string;

  firstNameForm: FormGroup;
  lastNameForm: FormGroup;
  usernameForm: FormGroup;
  passwordForm: FormGroup;

  commentForm: FormGroup;



  constructor(private authservice: AuthService, 
              private modalService: BsModalService, 
              private fb: FormBuilder,
              private postservice: PostService,
              private socketservice: SocketIOService)
               { }




  ngOnInit() {
    
    this.testSocket();
    //instances of formControlName
    this.passwordForm = this.fb.group(
      { password: ['', Validators.minLength] }
    );

    this.commentForm = this.fb.group({
      comment_body: ['']
    });


    this.authservice.fetchProfile()
        .subscribe((response:any) => {
          if(response){
            const { first_name, last_name, username, _id } = response;
            this.first_name = first_name;
            this.last_name = last_name;
            this.username = username;
            this._id = _id;

            this.firstNameForm = this.fb.group(
              { first_name: [first_name, Validators.required] }
            )
            this.lastNameForm = this.fb.group(
              { last_name: [last_name, Validators.required] }
            )
            this.usernameForm = this.fb.group(
              { username: [username, [Validators.minLength, Validators.required]] }
            )

        }
         }, (err:any) => {
          alert(err ? 'Server not found' : err);
    })


    this.postservice.fetchPosts()
        .subscribe((post: any) => {
          this.posts = post;
          //console.log(this.posts)
        })
}

    openModalEdit(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template,{ backdrop: 'static', keyboard: true });
    }

    openModalComment(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template, Object.assign({backdrop: 'static', keyboard: true }, { class: 'modal-xl' })
      );
  }

    // getCommentId() {
    //   this.postservice.fetchPosts emplate, Object.assign({}, { class: 'modal-xl' })
    // }

    onPatchComment(id:string) {

      this.postservice.addComment(id, this.commentForm.value)
          .subscribe((response:any) => {
            alert(response.msg);
          },
          (err:any) => {
            alert(err.msg);
          })


      
      // this.postservice.addComment(id, comment)
      //console.log(id);
    }

    resetForm() {
      //this.firstNameForm.get('first_name').
      this.firstNameForm.get('first_name').setValue(this.first_name);
      this.lastNameForm.get('last_name').setValue(this.last_name);
      this.usernameForm.get('username').setValue(this.username);
      this.passwordForm.get('password').setValue('');
      this.commentForm.get('comment_body').setValue('');
    }

    onSubmitEdit() {
      
      const form = this.filteredForm();
      this.authservice.editProfile(form)
          .subscribe((response:any) => {
            alert(response.msg);
            window.location.href = '/' 
          }, 
          (err:any) => {
              this.errors = err.error.msg;
          }
        )
    }

    
    filteredForm() {
      var newFilteredForm: any = {};
      if(this.firstNameForm.value && this.firstNameForm.get('first_name').value !== this.first_name){
        newFilteredForm.first_name = this.firstNameForm.get('first_name').value;
      }
      if(this.lastNameForm.value && this.lastNameForm.get('last_name').value !== this.last_name){
        newFilteredForm.last_name = this.lastNameForm.get('last_name').value;
      }
      if(this.usernameForm.value && this.usernameForm.get('username').value !== this.username){
        newFilteredForm.username = this.usernameForm.get('username').value;
      }
      if(this.passwordForm.value && this.passwordForm.get('password').value !== ''){
        newFilteredForm.password = this.passwordForm.get('password').value;
      }   
      return newFilteredForm;
    }

    onReset() {
      this.modalRef.hide();
      this.resetForm();
      this.errors = null;
    }   

    testSocket() {

      this.socketservice.connect();
      this.socketservice.getPosts().on('test', data => {
        console.log(data);
        this.test = data.msg;
      });


      // console.log(this.test.connected);
      // console.log(this.test.io);
      
    }
}
