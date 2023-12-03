import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage {

  constructor(private navCtrl: NavController) { }

  navigateToRegister() {
    this.navCtrl.navigateForward('/auth/register');
  }

  navigateToLogin() {
    this.navCtrl.navigateForward('/auth/login');
  }

  navigateToHome() {
    this.navCtrl.navigateForward('/home');
  }
}
