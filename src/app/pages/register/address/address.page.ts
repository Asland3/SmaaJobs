import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class addressPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  navigateToStart() {
    this.navCtrl.navigateBack('/start');
  }

  goBack() {
    this.navCtrl.navigateBack('/about-you');
  }

  //TODO: ordentlig register metode :)
  Register() {
    this.navCtrl.navigateForward('/home');
  }
}
