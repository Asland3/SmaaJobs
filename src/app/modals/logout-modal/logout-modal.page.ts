import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.page.html',
  styleUrls: ['./logout-modal.page.scss'],
})
export class LogoutModalPage implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private navCtrl: NavController,
    private menu: MenuController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async logoutConfirm() {
    const loading = await this.loadingController.create({
      message: 'Logging out...',
    });
    await loading.present();

    try {
      await this.authService.logout();
      await this.modalCtrl.dismiss();
      await this.menu.close();
      // await this.authService.updateUserData();        Vi skal have slettet/opdateret data i view, når logget ud.
      this.navCtrl.navigateBack('/start');
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Logout failed',
        message: error.message,
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      await loading.dismiss();
    }
  }

  async cancel() {
    await this.modalCtrl.dismiss();
  }
}
