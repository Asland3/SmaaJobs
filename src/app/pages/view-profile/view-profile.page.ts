import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Jobs } from 'src/app/models/jobs.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { JobService } from 'src/app/services/job-service/job.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  userId: any;
  user: any;
  userJobs: Jobs[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private jobSerivce: JobService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.authService.getSpecificUser(this.userId).then((userData) => {
      if (userData) {
        this.user = userData;
      }
    });
    this.jobSerivce.getJobsfromSpecificUser(this.userId).then((jobsData) => {
      if (jobsData) {
        this.userJobs = jobsData;
      }
    });
  }

  navigateBack() {
    this.navCtrl.back();
  }
  openJob(jobId?: string) {
    this.navCtrl.navigateForward(`/home/${jobId}`);
  }
}
