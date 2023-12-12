import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job-service/job.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Jobs } from 'src/app/models/jobs.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  job!: Jobs;
  currentUser: any;

  constructor(
    private navCtrl: NavController,
    private jobService: JobService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const jobId = this.route.snapshot.params['jobId'];
    this.jobService.getJob(jobId).then((jobData) => {
      if (jobData) {
        this.job = jobData;
      }
    });

    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  navigateBack() {
    this.navCtrl.back();
  }

  startChat() {
    // Implement chat functionality or navigation

    //Malthe fix
  }
}
