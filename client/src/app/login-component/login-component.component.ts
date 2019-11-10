import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service'





@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  logForm: FormGroup;
  errors: string;
  

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit() {

   //Instances of FormControl of the FormGroup
    this.logForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      }
  );

    if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/')
    }
  }

  onSubmit(){
    this.authService.onLogin(this.logForm.value)
      .subscribe( (response: any) => {
         
        //save the response token from api to locale
        this.authService.setToken(response.token);
        this.router.navigateByUrl('/');
    }, (err: any) => {
      //alert(err.error.msg);
      this.errors = err.error.msg;
    })
  }
}
