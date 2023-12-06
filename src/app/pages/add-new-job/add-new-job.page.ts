import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { CATEGORIES, Category } from 'src/app/models/category.model';
import { JobService } from 'src/app/services/job-service/job.service';

@Component({
  selector: 'app-add-new-job',
  templateUrl: './add-new-job.page.html',
  styleUrls: ['./add-new-job.page.scss'],
})
export class AddNewJobPage implements OnInit {
  public imageURIs: string[] = ['', '', '']; // For storing image Data URLs
  public imageBlobs: Blob[] = [null!, null!, null!]; // For storing image Blobs
  categories: Category[] = [];
  selectedCategoryId: number | undefined;
  credentials: FormGroup | any;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private jobService: JobService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.categories = CATEGORIES;
    this.validators();
  }

  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }

  async openCamera(cardIndex: number) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    if (image.dataUrl) {
      // Store the Data URL in imageURIs for display
      this.imageURIs[cardIndex] = image.dataUrl;

      // Convert the Data URL to a Blob and store in imageBlobs for upload
      const response = await fetch(image.dataUrl);
      this.imageBlobs[cardIndex] = await response.blob();
    } else {
      console.log('No image selected');
    }
  }

  removePhoto(cardIndex: number) {
    this.imageURIs[cardIndex] = '';
  }

  countSelectedImages(): number {
    return this.imageURIs.filter((uri) => uri !== '').length;
  }

  async createJob() {
    if (this.credentials.valid) {
      const loading = await this.loadingController.create({
        message: 'Opretter job...',
      });
      await loading.present();
      const jobPhotoBlobs = this.imageBlobs.filter((blob) => blob !== null);

      const jobData = {
        ...this.credentials.value,
        photos: jobPhotoBlobs,
      };
      try {
        await this.jobService.addJob(jobData);
        await loading.dismiss();
        this.navCtrl.navigateBack('/home');
        const toast = await this.toastController.create({
          message: 'Job oprettet',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      } catch (error: any) {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Oprettelse af job fejlede',
          message: error.message,
          buttons: ['OK'],
        });

        await alert.present();
      }
    } else {
      this.credentials.markAllAsTouched();
    }
  }

  validators() {
    this.credentials = this.fb.group({
      title: ['', [Validators.required]],
      subline: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      payment: ['', [Validators.required]],
    });
  }

  get title() {
    return this.credentials?.get('title');
  }

  get subline() {
    return this.credentials?.get('subline');
  }

  get category() {
    return this.credentials?.get('category');
  }

  get description() {
    return this.credentials?.get('description');
  }

  get payment() {
    return this.credentials?.get('payment');
  }
}
