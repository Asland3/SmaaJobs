import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FiltermodalPage } from '../../modals/filtermodal/filtermodal.page';
import { JobService } from 'src/app/services/job-service/job.service';
import { Jobs } from 'src/app/models/jobs.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  jobs: Jobs[] = [];
  filteredJobs: Jobs[] = [];
  searchTerm: string = '';
  currentUser: any;
  selectedCategories: string[] = [];
  isLoading: boolean = false;
  skeletonArray = [1, 2, 3]

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ionViewDidEnter() {
    this.getJobs();
  }

  async getJobs() {
    this.isLoading = true;
    this.jobs = await this.jobService.getAllJobs();
    this.applyFilters();
    this.isLoading = false;
  }

  applyFilters() {
    let filtered = this.jobs;

    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter((job) =>
        this.selectedCategories.includes(job.category!)
      );
    }

    if (this.searchTerm) {
      filtered = filtered.filter((job) =>
        job.title!.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredJobs = filtered;
  }

  async presentFilterModal() {
    const modal = await this.modalController.create({
      component: FiltermodalPage,
      breakpoints: [0, 0.45, 0.6, 0.75],
      initialBreakpoint: 0.6,
      presentingElement: await this.modalController.getTop(),
    });

    await modal.present();

    const { data: selectedCategories } = await modal.onDidDismiss();
    if (selectedCategories) {
      this.selectedCategories = selectedCategories;
    } else {
      this.selectedCategories = [];
    }
    this.applyFilters();
  }

  addNew() {
    this.navCtrl.navigateForward('/add-new-job');
  }  
}
