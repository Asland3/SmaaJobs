import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-email-password',
  templateUrl: './email-password.page.html',
  styleUrls: ['./email-password.page.scss'],
})
export class EmailPasswordPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToNamePicture() {
    this.navCtrl.navigateForward('auth/name-picture');
  }

  navigateToStart() {
    this.navCtrl.navigateBack('/start');
  }
}
