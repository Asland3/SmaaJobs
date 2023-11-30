import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.page.html',
  styleUrls: ['./adress.page.scss'],
})
export class AdressPage implements OnInit {
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
