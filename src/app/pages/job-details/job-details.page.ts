import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job-service/job.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  job: any; // Add a variable to store the job details
  jobPhotos: string[] = [];
  currentUser: any;

  constructor(
    private navCtrl: NavController,
    private jobService: JobService,
    private route: ActivatedRoute, 
    private authService: AuthService
  ) { }

  ngOnInit() {
    // const jobId = this.route.snapshot.params['jobId'];
    // this.loadJobDetails(jobId);

    // this.authService.currentUser.subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  // loadJobDetails(jobId: string) {
  //   this.jobService.getJob(jobId).subscribe(job => {
  //     this.job = job; // Store the entire job object
  //     this.jobPhotos = job.photos || []; // Assuming 'photos' is an array of image URLs
  //   }, error => {
  //     console.error('Error fetching job details:', error);
  //   });
  // }

  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }

  startChat() {
    // Implement chat functionality or navigation
  }
}
