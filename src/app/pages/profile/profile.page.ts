import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Jobs } from 'src/app/models/jobs.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { JobService } from 'src/app/services/job-service/job.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user!: User;
  userJobs: Jobs[] = [];

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private jobService: JobService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(async (userData) => {
      if (userData) {
        this.user = userData;
      }
    });
  }

  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }

  editProfile() {
    this.navCtrl.navigateForward(`/profile/user/${this.user.uid}`);
  }

  async deleteJobConfirmation(jobId?: string) {
    const alert = await this.alertController.create({
      header: 'Bekræft sletning',
      message: 'Er du sikker på, at du vil slette dette job?',
      buttons: [
        {
          text: 'Annuller',
          role: 'cancel',
        },
        {
          text: 'Slet',
          handler: () => {
            this.deleteJob(jobId);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteJob(jobId: any) {
    const loading = await this.loadingController.create({
      message: 'Sletter job...'
    });
    await loading.present();
  
    try {
      await this.jobService.deleteJob(jobId);
      await loading.dismiss();
      this.loadUserJobs();
  
      const toast = await this.toastController.create({
        message: 'Job slettet',
        duration: 2000,
        color: 'success',
      });
      toast.present();
  
    } catch (error) {
      await loading.dismiss();
      console.error('Fejl under sletning af job:', error);
  
      const alert = await this.alertController.create({
        header: 'Fejl ved sletning af job',
        message: 'Der skete en fejl under sletning af jobbet. Prøv igen senere.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  

  async loadUserJobs() {
    this.userJobs = await this.jobService.getJobsForUser();
  }

  ionViewDidEnter() {
    this.loadUserJobs();
  }

  openJob(jobId?: string) {
    this.navCtrl.navigateForward(`/home/${jobId}`);
  }

  updateJob(jobId?: string) {
    this.navCtrl.navigateForward(`/profile/job/${jobId}`);
  }
}
