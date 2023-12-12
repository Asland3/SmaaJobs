import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  user!: User;
  credentials: FormGroup | any;
  newProfileImageBlob: Blob | null = null;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.validators();
    this.loadUserData();
  }

  navigateBack() {
    this.navCtrl.back();
  }
  
  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });
  
      if (image.dataUrl) {
        this.user.profilePic = image.dataUrl;
        const response = await fetch(image.dataUrl);
        this.newProfileImageBlob = await response.blob();
        console.log(this.newProfileImageBlob);
      }
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  }
  
  editProfilePic() {
    this.openCamera();
  }
  async loadUserData() {
    this.authService.currentUser.subscribe(async (userData) => {
      this.user = userData;
      this.credentials.patchValue(userData);
    });
  }

  async updateProfile() {
    const loading = await this.loadingController.create({
      message: 'Opdaterer profil...'
    });
    await loading.present();
  
    const updatedUserData = this.credentials.value;
    const uid = this.user.uid;
    const newProfileImageBlob = this.newProfileImageBlob;
  
    if (uid) {
      try {
        await this.authService.updateUserProfile(uid, updatedUserData, newProfileImageBlob);
        this.authService.updateUserData();
        await loading.dismiss();
        this.navCtrl.navigateBack('/profile');
        this.user = { ...this.user, ...updatedUserData };
  
        if (newProfileImageBlob) {
          this.user.profilePic = URL.createObjectURL(newProfileImageBlob);
        }
  
        const toast = await this.toastController.create({
          message: 'Profil opdateret',
          duration: 2000,
          color: 'success'
        });
        toast.present();
  
      } catch (error) {
        await loading.dismiss();
        console.error('Fejl under opdatering af profil:', error);
  
        const alert = await this.alertController.create({
          header: 'Fejl',
          message: 'Der opstod en fejl under opdatering af din profil. Prøv igen senere.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      await loading.dismiss();
      console.error('Bruger-ID ikke fundet');
    }
  }
  
  

  validators() {
    this.credentials = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      age: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      town: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get email() {
    return this.credentials?.get('email');
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
