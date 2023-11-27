import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }


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
