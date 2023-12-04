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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup | any;
  profilePicBlob!: Blob
  selectedProfileImage!: string 


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
    } else {
      this.credentials.markAllAsTouched();
    }
  }

  swipeBack() {
    this.swiper?.slidePrev();
  }

  cancel() {
    this.navCtrl.navigateBack('/start');
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
        const registrationData = {
            ...this.credentials.value,
            profilePic: this.profilePicBlob
        };

        const user = await this.authService.register(registrationData);

        await loading.dismiss();

        if (user) {
            this.navCtrl.navigateForward('/home');
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
      source: CameraSource.Prompt,
    });

    if (image.dataUrl) {
      this.selectedProfileImage = image.dataUrl;
    }

    // Convert the image to Blob for Firebase Storage
    const response = await fetch(image.dataUrl!);
    this.profilePicBlob = await response.blob();
  }

  selectProfileImage(imageUri: string) {
    this.selectedProfileImage = imageUri;
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
