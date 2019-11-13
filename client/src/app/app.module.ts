import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { NavBarComponent } from './nav-bar/nav-bar.component'; 
import { HomeAuthNavbarComponent } from './home-auth/home-auth-navbar/home-auth-navbar.component';

import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from './_services/auth.service'

import { AuthGuardGuard } from './authGuard/auth-guard.guard';
import { AuthInterceptor } from './authGuard/auth-guard.interceptor';
import { AuthOthersComponent } from './home-auth/auth-others/auth-others.component';
import { ChatComponentComponent } from './home-auth/chat-component/chat-component.component';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeAuthNavbarComponent,
    AuthOthersComponent,
    routingComponents,
    ChatComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
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
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
