import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup | any;
  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.validators();
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  async login() {
    if (this.credentials.valid) {
      const loading = await this.loadingController.create({
        message: 'logger ind...',
      });
      await loading.present();

      this.authService.login(this.credentials.value).then(
        async () => {
          await loading.dismiss();
          this.navCtrl.navigateForward('/home');
        },
        async (err: any) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Login fejlede',
            message: err.message,
            buttons: ['OK'],
          });

          await alert.present();
        }
      );
    } else {
      this.credentials.markAllAsTouched();
    }
  }

  validators() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  navigateToForgotPassword() {
    this.navCtrl.navigateForward('/auth/forgot-password');
  }

  navigateToStart() {
    this.navCtrl.navigateBack('/start');
  }
}
