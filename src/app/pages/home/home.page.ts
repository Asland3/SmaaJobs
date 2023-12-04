import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { FiltermodalPage } from '../../modals/filtermodal/filtermodal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private modalController: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async presentFilterModal() {
    const modal = await this.modalController.create({
      component: FiltermodalPage,
      breakpoints: [0, 0.3, 0.55, 0.7],
      initialBreakpoint: 0.55,
      presentingElement: await this.modalController.getTop(),
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
    }
  }

  addNew(){
    this.navCtrl.navigateForward('/add-new-job');
  }
}