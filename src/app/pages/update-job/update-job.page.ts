import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { CATEGORIES, Category } from 'src/app/models/category.model';
import { Jobs } from 'src/app/models/jobs.model';
import { JobService } from 'src/app/services/job-service/job.service';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.page.html',
  styleUrls: ['./update-job.page.scss'],
})
export class UpdateJobPage implements OnInit {
  public imageURIs: string[] = ['', '', '']; // For storing image Data URLs
  public imageBlobs: (Blob | null)[] = [null, null, null]; // For storing image Blobs
  public imageUpdated: boolean[] = [false, false, false];
  categories: Category[] = [];
  selectedCategoryId: number | undefined;
  credentials: FormGroup | any;
  newJobData!: Jobs;
  job!: Jobs;
  jobId: any;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private jobService: JobService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.categories = CATEGORIES;
    this.validators();
    this.jobId = this.route.snapshot.paramMap.get('jobId'); 
    this.loadExistingJobData(this.jobId);
  }

  navigateBack() {
    this.navCtrl.back();
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
      console.log(this.imageBlobs);
  
      // Mark this image as updated
      this.imageUpdated[cardIndex] = true;
    } 
  }

  removePhoto(cardIndex: number) {
    this.imageURIs[cardIndex] = '';
    this.imageBlobs[cardIndex] = null;
  
    // Mark this image as not updated
    this.imageUpdated[cardIndex] = false;
  }

  countSelectedImages(): number {
    console.log(this.imageURIs);
    return this.imageURIs.filter((uri) => uri !== '').length;
  }

  async loadExistingJobData(jobId: string) {
    try {
      const jobData = await this.jobService.getJob(jobId);
      if (jobData) {
        this.credentials.setValue({
          title: jobData.title,
          subline: jobData.subline,
          category: jobData.category,
          description: jobData.description,
          payment: jobData.payment,
        });
        if (jobData.photos && jobData.photos.length) {
          this.imageURIs = [...jobData.photos];
        }
      }
    } catch (error) {
      console.error('Failed to load job data:', error);
    }
  }

  // Update the updateJob method to only upload new or updated images
async updateJob() {
  if (this.credentials.valid) {
    const loading = await this.loadingController.create({
      message: 'Opdaterer job...',
    });
    await loading.present();

    // Only include new or updated images in the newJobData
    const updatedImageBlobs = this.imageBlobs.filter((blob, index) => blob !== null && this.imageUpdated[index]);

    this.newJobData = {
      ...this.credentials.value,
      photos: this.imageBlobs.filter((blob, index) => blob !== null && this.imageUpdated[index]),
    };

    try {
      await this.jobService.updateJob(this.jobId, this.newJobData, this.imageBlobs.filter((blob) => blob !== null) as Blob[]);
      await loading.dismiss();
      this.navCtrl.navigateBack('/profile');
      const toast = await this.toastController.create({
        message: 'Job opdateret',
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } catch (error: any) {
      await loading.dismiss();
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Opdatering af job fejlede',
        message: 'Der skete en fejl under opdatering af jobbet. Prøv igen senere.',
        buttons: ['OK'],
      });
      console.log('Error message, while updating: ', error.message);

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
