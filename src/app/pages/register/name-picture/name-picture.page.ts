import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-name-picture',
  templateUrl: './name-picture.page.html',
  styleUrls: ['./name-picture.page.scss'],
})
export class NamePicturePage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  navigateToStart() {
    this.navCtrl.navigateBack('/start');
  }

  goBack(){
    this.navCtrl.navigateBack('auth/email-password');
  }

  goToAboutYou() {
    this.navCtrl.navigateForward('auth/about-you');
  }
}
