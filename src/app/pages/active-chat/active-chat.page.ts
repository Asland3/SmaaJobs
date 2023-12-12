import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat-service/chat.service';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.page.html',
  styleUrls: ['./active-chat.page.scss'],
})
export class ActiveChatPage implements OnInit {
  // messages: any[] = [];
  private messagesSubscription!: Subscription;

  messages$!: Observable<any[]>;
  chatId!: string;
  recipient: any;


  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private auth: Auth // Assuming you're using Firebase Auth
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    this.chatId = params['chatId'];
    console.log("🚀 ~ file: active-chat.page.ts:30 ~ ActiveChatPage ~ ngOnInit ~ this.chatId:", this.chatId)
    if (params['recipientData']) {
      this.recipient = JSON.parse(params['recipientData']);
      console.log("🚀 ~ file: active-chat.page.ts:32 ~ ActiveChatPage ~ ngOnInit ~ this.recipient:", this.recipient)
    }

    this.messages$ = this.chatService.getMessages(this.chatId);
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }


  sendMessage(text?: string) {
    const userId = this.auth.currentUser?.uid;
    if (userId && text) {
      this.chatService.sendMessage(this.chatId, text, userId).then(() => {
        // Clear the input field, handle UI updates, etc.
      });
    }
  }

 


  navigateToChat() {
    this.navCtrl.navigateBack('/chat');
  }
}
