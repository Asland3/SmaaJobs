import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.page.html',
  styleUrls: ['./about-you.page.scss'],
})
export class AboutYouPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  navigateToStart() {
    this.navCtrl.navigateBack('/start');
  }
  goBack() {
    this.navCtrl.navigateBack('/name-picture');
  }

  goToNext() {
    this.navCtrl.navigateForward('/adress');
  }
}
