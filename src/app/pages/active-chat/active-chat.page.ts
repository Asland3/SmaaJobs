import {
  Component,
  OnInit,
} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ChatService } from 'src/app/services/chat-service/chat.service';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.page.html',
  styleUrls: ['./active-chat.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveChatPage implements OnInit {
  // messages: any[] = [];
  private messagesSubscription!: Subscription;

  messages$!: Observable<any[]>;
  chatId!: string;
  recipient: any;
  currentUser: any;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.currentUser;

    const params = this.route.snapshot.queryParams;
    this.chatId = params['chatId'];
    console.log(
      '🚀 ~ file: active-chat.page.ts:30 ~ ActiveChatPage ~ ngOnInit ~ this.chatId:',
      this.chatId
    );
    if (params['recipientData']) {
      this.recipient = JSON.parse(params['recipientData']);
      console.log(
        '🚀 ~ file: active-chat.page.ts:32 ~ ActiveChatPage ~ ngOnInit ~ this.recipient:',
        this.recipient
      );
    }

    this.messages$ = this.chatService.getMessages(this.chatId).pipe(
      map((messages) =>
        messages.map((message) => ({
          ...message,
          createdAt: new Date(message.createdAt.seconds * 1000), // Convert to JavaScript Date
        }))
      )
    );
  }

  sendMessage(text: any) {
    const userId = this.currentUser.uid;
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
