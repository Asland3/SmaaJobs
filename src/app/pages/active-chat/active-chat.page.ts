import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.page.html',
  styleUrls: ['./active-chat.page.scss'],
})
export class ActiveChatPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  navigateToChat() {
    this.navCtrl.navigateBack('/chat');
  }
}
