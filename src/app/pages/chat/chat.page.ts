import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription, first, firstValueFrom, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {
  conversations: any[] = [];
  usersData: Map<string, any> = new Map(); // To store user data
  subscription!: Subscription;
  loading: boolean = false;

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
      this.loading = true;
      this.subscription = this.chatService
        .getConversations(user.uid)
        .subscribe(async (conversations) => {
          const conversationsWithDetails = await Promise.all(
            conversations.map(async (conversation) => {
              const chatId = conversation.id;
              const lastMessageObservable =
                this.chatService.getLastMessage(chatId);
              const lastMessage = await firstValueFrom(lastMessageObservable);

              const recipientId = conversation.userIds.find(
                (userId: string) => userId !== user.uid
              );

              let userData = null;
              if (recipientId) {
                userData = this.usersData.get(recipientId);
                if (!userData) {
                  // Fetch user data if not already cached
                  userData = await this.authService.getSpecificUser(
                    recipientId
                  );
                  this.usersData.set(recipientId, userData);
                }
              }

              return {
                ...conversation,
                recipient: userData,
                lastMessage: lastMessage.length > 0 ? lastMessage[0] : null,
              };
            })
          );

          this.conversations = conversationsWithDetails;
          this.loading = false;
        });
    } else {
      console.log('No user is currently logged in.');
      this.loading = false;
    }
  }

  openChat(chatId: string, recipientId: string) {
    this.router.navigate(['/active-chat'], {
      queryParams: { chatId, userId: recipientId },
    });
  }

  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }
}
