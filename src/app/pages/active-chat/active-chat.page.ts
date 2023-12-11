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

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      // console.log(user);
      
        // Assign the subscription to messagesSubscription
        this.messagesSubscription = this.chatService.getMessages("y5R7rdeGxhO9MlSjT9wogIrFYy12").subscribe((data) => {
          this.messages = data;
          console.log("🚀 ~ file: active-chat.page.ts:29 ~ ActiveChatPage ~ this.messagesSubscription=this.chatService.getMessages ~ this.messages:", this.messages)
          
        });
      
    });
  }
  

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
  

  test() {
    this.chatService.sendMessage('Test2', "y5R7rdeGxhO9MlSjT9wogIrFYy12", "y5R7rdeGxhO9MlSjT9wogIrFYy12");
  }

  navigateToChat() {
    this.navCtrl.navigateBack('/chat');
  }
}
