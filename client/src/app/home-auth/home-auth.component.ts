import { Component, OnInit, TemplateRef  } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

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
  
  modalRef: BsModalRef;
  errors: string;

  firstNameForm: FormGroup;
  lastNameForm: FormGroup;
  usernameForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private authservice: AuthService, private modalService: BsModalService, private fb: FormBuilder, private router: Router) { }




  ngOnInit() {

    //instances of formControlName
    this.firstNameForm = this.fb.group(
      { first_name: [''] }
    )
    this.lastNameForm = this.fb.group(
      { last_name: [''] }
    )

    this.usernameForm = this.fb.group(
      { username: [''] }
    )

    this.passwordForm = this.fb.group(
      { password: [''] }
    )



    this.authservice.fetchProfile()
        .subscribe((response:any) => {
          if(response){
            const { first_name, last_name, username, _id } = response;
            this.first_name = first_name;
            this.last_name = last_name;
            this.username = username;
            this._id = _id;
        }
         }, (err:any) => {
          alert(err.errors.msg);
    })
}

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template,{ backdrop: 'static', keyboard: false });
    }

    onSubmitEdit() {
      const form = this.editForm();
      if(form === {}) {
          alert('form is {}');
      }

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



    editForm() {
      var initForm: any = {};

      if(this.firstNameForm.value && this.firstNameForm.get('first_name').value !== ''){
        initForm.first_name = this.firstNameForm.get('first_name').value;
      }

      if(this.lastNameForm.value && this.lastNameForm.get('last_name').value !== ''){
        initForm.last_name = this.lastNameForm.get('last_name').value;
      }

      if(this.usernameForm.value && this.usernameForm.get('username').value !== ''){
        initForm.username = this.usernameForm.get('username').value;
      }

      if(this.passwordForm.value && this.passwordForm.get('password').value !== ''){
        initForm.password = this.passwordForm.get('password').value;
      }   

      return initForm;
    }
}
