import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserLogin } from '../model/user-login';
import { UserModel } from '../model/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //http Methods
  onLogin(user: UserLogin) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${environment.apiEndpoint}/users/auth`, user, { headers: header });
  }

  fetchProfile() {
    const header = new HttpHeaders().set('Content-Type',  'application/json');
    return this.http.get(`${environment.apiEndpoint}/users/profile`, {headers: header});
  }

  onRegister(user: UserModel) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${environment.apiEndpoint}/users/create`, user, {headers: header});
  }

  editProfile(user: UserModel) {
    const userPayload: any = this.getUserPayload();
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${environment.apiEndpoint}/users/update/${userPayload._id}`, user, {headers: header});
  }

  
  //Non http methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = localStorage.getItem('token');
    if(token) {
      const helper = new JwtHelperService();

      //decode jwt token
      var userPayload = helper.decodeToken(token);
      return userPayload
    } else return null;
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload()
    if(userPayload) {
      return true;
    } else return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
