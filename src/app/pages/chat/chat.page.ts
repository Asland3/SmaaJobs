import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription, first, firstValueFrom, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ChatService } from 'src/app/services/chat-service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  conversations: any[] = [];
  usersData: Map<string, any> = new Map(); // To store user data
  subscription!: Subscription;

  constructor(
    private navCtrl: NavController,
    private chatService: ChatService,
    private authService: AuthService,
    private auth: Auth,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      this.subscription = this.chatService
        .getConversations(user.uid)
        .subscribe(async (conversations) => {
          const conversationsWithDetails = await Promise.all(
            conversations.map(async (conversation) => {
              const chatId = conversation.id;
              const lastMessageObservable = this.chatService.getLastMessage(chatId);
              const lastMessage = await firstValueFrom(lastMessageObservable);
  
              const recipientId = conversation.userIds.find(
                (userId: string) => userId !== user.uid
              );
  
              let userData = null;
              if (recipientId) {
                userData = this.usersData.get(recipientId);
                if (!userData) {
                  // Fetch user data if not already cached
                  userData = await this.authService.getUser(recipientId);
                  this.usersData.set(recipientId, userData);
                }
              }
  
              return {
                ...conversation,
                recipient: userData,
                lastMessage: lastMessage.length > 0 ? lastMessage[0] : null
              };
            })
          );
  
          this.conversations = conversationsWithDetails;
          console.log("🚀 ~ file: chat.page.ts:61 ~ ChatPage ~ .subscribe ~ this.conversations:", this.conversations)
        });
    } else {
      console.log('No user is currently logged in.');
    }
  }

  openChat(conversationId: string) {
    // Navigate to the chat window with the necessary parameters
    this.router.navigate(['/chat-window'], { queryParams: { conversationId, recipientId } });
  }
  
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }
}
