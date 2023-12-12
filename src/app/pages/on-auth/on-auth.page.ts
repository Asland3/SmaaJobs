import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-on-auth',
  templateUrl: './on-auth.page.html',
  styleUrls: ['./on-auth.page.scss'],
})
export class OnAuthPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToLogIn() {
    this.navCtrl.navigateBack('/start');
  }
  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }
}
