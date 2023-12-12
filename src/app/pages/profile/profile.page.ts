import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
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
    private alertController: AlertController
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
    this.navCtrl.navigateForward(`/profile/${this.user.uid}`);
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
    await this.jobService.deleteJob(jobId);
    this.loadUserJobs();
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
    this.navCtrl.navigateForward(`/profile/${jobId}`);
  }
}
