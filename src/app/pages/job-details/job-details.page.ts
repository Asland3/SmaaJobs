import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/services/job-service/job.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Jobs } from 'src/app/models/jobs.model';
import { ChatService } from 'src/app/services/chat-service/chat.service';

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
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router // Add this
  ) {}

  ngOnInit() {
    const jobId = this.route.snapshot.params['jobId'];
    this.jobService.getJob(jobId).then((jobData) => {
      if (jobData) {
        this.job = jobData;
        console.log("🚀 ~ file: job-details.page.ts:29 ~ JobDetailsPage ~ this.jobService.getJob ~ this.job:", this.job)
      }
    });

    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }

  async startChat() {
    if (!this.currentUser || !this.job) {
      this.navCtrl.navigateForward('/on-auth')
      return;
    }

    try {
      const chatId = await this.chatService.getOrCreateConversationId(this.currentUser.uid, this.job.userId!);
      this.router.navigate(['/active-chat'], { queryParams: { chatId, userId: this.job.userId } });
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  }
}
