import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { FiltermodalPage } from '../filtermodal/filtermodal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  async presentFilterModal() {
    const modal = await this.modalController.create({
      component: FiltermodalPage,
      breakpoints: [0, 0.3, 0.52, 0.6],
      initialBreakpoint: 0.52,
      presentingElement: await this.modalController.getTop()
    });
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
    if (data) {
      
    }
  }
  
}
