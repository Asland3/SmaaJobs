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
  profilePicBlob!: Blob;
  selectedProfileImage!: string;

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
    const currentSlideIndex = this.swiper?.activeIndex || 0;

    const slideGroups = ['slide1', 'slide2', 'slide3', 'slide4'];
    const currentGroup = this.credentials.get(slideGroups[currentSlideIndex]);

    if (currentSlideIndex === 1 && !this.profilePicBlob) {
      this.alertController.create({
        header: 'Profile Picture Required',
        message: 'Please select a profile picture to continue.',
        buttons: ['OK']
      }).then(alert => alert.present());
      return; 
    }

    if (currentGroup.valid) {
      this.swiper?.slideNext();
    } else {
      currentGroup.markAllAsTouched();
    }
  }

  swipeBack() {
    this.swiper?.slidePrev();
  }

  cancel() {
    this.navCtrl.navigateBack('/start');
  }

  validators() {
    this.credentials = this.fb.group({
      slide1: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          rePassword: ['', [Validators.required, Validators.minLength(6)]],
        },
        { validators: this.checkPasswords }
      ),
      slide2: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      }),
      slide3: this.fb.group({
        age: ['', [Validators.required]],
        description: ['', [Validators.required]],
      }),
      slide4: this.fb.group({
        town: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        phone: ['', [Validators.required]],
      }),
    });
  }

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    let pass = control.get('password')?.value || '';
    let confirmPass = control.get('rePassword')?.value || '';

    return pass === confirmPass ? null : { notSame: true };
  }

  async register() {
    if (this.credentials.valid) {
      const loading = await this.loadingController.create({
        message: 'Creating account...',
      });
      await loading.present();

      // Flatten the form data
      const formData = {
        ...this.credentials.get('slide1').value,
        ...this.credentials.get('slide2').value,
        ...this.credentials.get('slide3').value,
        ...this.credentials.get('slide4').value,
        profilePic: this.profilePicBlob,
      };

      try {
        const user = await this.authService.register(formData);

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
    } else {
      this.credentials.markAllAsTouched();
    }
  }

  async openGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });
  
      if (image.dataUrl) {
        // Convert DataURL to Image Object
        const img = new Image();
        img.src = image.dataUrl;
        
        img.onload = () => {
          // Create Canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          // Ensure canvas is square
          const size = Math.min(img.width, img.height);
          canvas.width = size;
          canvas.height = size;
  
          // Draw round image
          ctx?.beginPath();
          ctx?.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
          ctx?.closePath();
          ctx?.clip();
  
          ctx?.drawImage(img, 0, 0, size, size);
  
          // Convert canvas to DataURL
          const roundImageUrl = canvas.toDataURL();
          this.selectedProfileImage = roundImageUrl;
          
          // Convert DataURL to Blob if needed
          fetch(roundImageUrl)
            .then(res => res.blob())
            .then(blob => {
              this.profilePicBlob = blob;
            });
        };
      }
    } catch (error) {
      console.log('Camera prompt was dismissed', error);
    }
  }
  

  selectProfileImage(imageUri: string) {
    this.selectedProfileImage = imageUri;

    fetch(imageUri)
      .then((response) => response.blob())
      .then((blob) => {
        this.profilePicBlob = blob;
      })
      .catch((error) => {
        console.error('Error fetching avatar image:', error);
      });
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
