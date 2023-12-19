import { ChangeDetectorRef, Component, } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ChatService } from 'src/app/services/chat-service/chat.service';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.page.html',
  styleUrls: ['./active-chat.page.scss'],
})
export class ActiveChatPage {

  showDetails = false;

  messages$!: Observable<any[]>;
  chatId!: string;
  recipient: any;
  currentUser: any;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.currentUser = this.auth.currentUser;

    const params = this.route.snapshot.queryParams;
    this.chatId = params['chatId'];

    const recipientUserId = params['userId'];
    if (recipientUserId) {
      this.authService
        .getSpecificUser(recipientUserId)
        .then((recipientData) => {
          this.recipient = recipientData;
        });

      this.messages$ = this.chatService.getMessages(this.chatId).pipe(
        map((messages) =>
          messages.map((message) => ({
            ...message,
            createdAt: new Date(message.createdAt.seconds * 1000),
          }))
        )
      );

      // Subscribe to messages$ and call scrollToBottom
    this.messages$.subscribe(() => {
      setTimeout(() => {
        this.scrollToBottom();
      }, 500);
    });
    
    }
  }

  scrollToBottom() {
    const chatMessages = document.querySelector(
      '.chat-messages'
    ) as HTMLElement;
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  sendMessage(text: any) {
    const userId = this.currentUser.uid;
    if (userId && text) {
      this.chatService.sendMessage(this.chatId, text, userId).then(() => {
        // this.scrollToBottom();
      });
      
    }
  }

  navigateToChat() {
    this.navCtrl.navigateBack('/chat');
  }

  openProfile() {
    this.navCtrl.navigateForward(`/view-profile/${this.recipient.uid}`);
  }
}
