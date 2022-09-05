import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  socket = new SockJS('http://localhost:8080/ws');
  stompClient = Stomp.over(this.socket);
  mysubid = 'my-subscription-id-002';
  constructor() {}

  subscribe(topic: string, callback: any): void {
    const conected: boolean = this.stompClient.connected;
    if (conected) {
      this.subscribeToTopic(topic, callback);
      return;
    }

    this.stompClient.connect({}, () => {
      this.subscribeToTopic(topic, callback);
    });
  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(
      topic,
      (result: any): any => {
        callback(result.body);
      },
      { id: this.mysubid }
    );
  }

  disconnect() {
    const conected: boolean = this.stompClient.connected;

    if (conected) this.stompClient.unsubscribe(this.mysubid);
  }
}
