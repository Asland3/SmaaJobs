import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import Swiper from 'swiper';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  credentials: FormGroup | any;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.validators();
  }

  swiperReady() {
    // Wait for the component to render completely
    setTimeout(() => {
      this.swiper = this.swiperRef?.nativeElement.swiper;
    }, 500);
  }

  swipeNext() {
    if (this.credentials.valid) {
      this.swiper?.slideNext();
    }else{
      this.credentials.markAllAsTouched();
    }
  }

  swipeBack() {
    this.swiper?.slidePrev();
  }

  validators() {
    this.credentials = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        age: ['', [Validators.required]],
        description: ['', [Validators.required]],
        town: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        phone: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    let pass = control.get('password')?.value || '';
    let confirmPass = control.get('rePassword')?.value || '';

    return pass === confirmPass ? null : { notSame: true };
  }



  async register() {
    const loading = await this.loadingController.create({
      message: 'Creating account...',
    });
    await loading.present();

    try {
      const user = await this.authService.register(this.credentials.value);

      console.log(user);
      await loading.dismiss();

      if (user) {
        this.navCtrl.navigateBack('login', { replaceUrl: true });
      }
    } catch (error: any) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Registration failed',
        message: error.message,
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  async openGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
  
    if (image.dataUrl) {
      // Directly assign the base64 string to this.recipe.image
      this.recipe.image = image.dataUrl;
    }
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  get rePassword() {
    return this.credentials?.get('rePassword');
  }

  get firstName() {
    return this.credentials?.get('firstName');
  }

  get lastName() {
    return this.credentials?.get('lastName');
  }

  get age() {
    return this.credentials?.get('age');
  }

  get description() {
    return this.credentials?.get('description');
  }

  get town() {
    return this.credentials?.get('town');
  }

  get postalCode() {
    return this.credentials?.get('postalCode');
  }

  get phone() {
    return this.credentials?.get('phone');
  }
}
