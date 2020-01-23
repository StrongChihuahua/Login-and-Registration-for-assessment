import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  socket:any;
  

  constructor() { }

  connect():any {
    
    this.socket = io.connect(environment.socketIO);


    const payload = { msg: 'Hello Server!' };
    //his.socket.emit('toServer', payload);
  }

  getMsg():any {
    
   return this.socket;
  }

  getPosts():any {
    return this.socket;
  }
}
