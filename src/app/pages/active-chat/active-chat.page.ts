import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
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
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  async ngOnInit() {

  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

 


  navigateToChat() {
    this.navCtrl.navigateBack('/chat');
  }
}
