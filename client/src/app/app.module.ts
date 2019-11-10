import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';

//Navbars
import { NavBarComponent } from './nav-bar/nav-bar.component'; 
import { HomeAuthNavbarComponent } from './home-auth/home-auth-navbar/home-auth-navbar.component';

//Services
import { AuthService } from './_services/auth.service'

//JWT token decoder
import { JwtHelperService } from "@auth0/angular-jwt";

//AUTH GUARD
import { AuthGuardGuard } from './authGuard/auth-guard.guard';
import { AuthInterceptor } from './authGuard/auth-guard.interceptor';
import { AuthOthersComponent } from './home-auth/auth-others/auth-others.component'



//import { Mat } from 


@NgModule({
  declarations: [
    AppComponent,

    //NAVBVARS
    NavBarComponent,
    HomeAuthNavbarComponent,
    
    AuthOthersComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [ 
              JwtHelperService, 
              AuthGuardGuard,
              AuthService, 
              BsModalRef,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
              },
              
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
