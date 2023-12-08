import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat-service/chat.service';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.page.html',
  styleUrls: ['./active-chat.page.scss'],
})
export class ActiveChatPage implements OnInit {
  messages: any[] = [];
  private messagesSubscription!: Subscription;

  constructor(
    private navCtrl: NavController,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe((data) => {
      this.messages = data;
    });
    console.log('ngOnInit');
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    console.log('ngOnDestroy');
  }

  test() {
    this.chatService.sendMessage('Hello World', '123');
  }

  navigateToChat() {
    this.navCtrl.navigateBack('/chat');
  }
}
