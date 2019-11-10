import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service'


@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {


  error: string;

//Registration formgroup
  regForm: FormGroup;
  

 //FormBuilder is a service
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService ) {
    

   }

  ngOnInit() {
    //Formcontrols
     this.regForm = this.fb.group(
       {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
       }
     );
  }


  onSubmit() {
   // console.log(this.regForm.get('password').value.length);
        this.authService.onRegister(this.regForm.value).subscribe((response: any) => {

          //set token upon regestering
          this.authService.setToken(response.token);
          this.router.navigateByUrl('/');
          
        }, (err: any) => {
          this.error = err.error.msg                                                  
        })
  }
}
