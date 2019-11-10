import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';


@Injectable() 

export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService, private router: Router) {}


    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const token = this.authService.getToken();
      if(token) {
          const clonedRequest = req.clone({ setHeaders: {
              'auth-token': token
          }})
        return next.handle(clonedRequest);
      } else {
          return next.handle(req.clone());
      }
    }

    

       
    }
    
