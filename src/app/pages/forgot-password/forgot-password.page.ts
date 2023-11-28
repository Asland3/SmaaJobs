import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ForgotPasswordModalPage } from 'src/app/modals/forgot-password-modal/forgot-password-modal.page';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  credentials: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.validators();
  }

  async forgotPassword() {
    if (this.credentials.valid) {
    const loading = await this.loadingController.create({
      message: 'Loader...',
    });
    await loading.present();

    this.authService.forgotPassword(this.credentials.value).then(
      async () => {
        await loading.dismiss();
        const modal = await this.modalCtrl.create({
          component: ForgotPasswordModalPage,
          cssClass: 'small-center-modal',
        });
        modal.onDidDismiss().then(() => {
          this.navCtrl.navigateBack('/auth/login');
        });
        await modal.present();
      },
      async (err: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Reset password failed',
          message: err.message,
          buttons: [{ text: 'OK', role: 'ok' }],
        });

        await alert.present();
      }
    );
  } else {
    this.credentials.markAllAsTouched();
  }
  }

  get email() {
    return this.credentials?.get('email');
  }

  validators() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  navigateTologin() {
    this.navCtrl.navigateBack('/auth/login');
  }
}
