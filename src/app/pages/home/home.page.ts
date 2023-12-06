import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FiltermodalPage } from '../../modals/filtermodal/filtermodal.page';
import { JobService } from 'src/app/services/job-service/job.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchTerm: string = ''; 
  currentUser: any;
  selectedCategories: string[] = []; // Tilføjer et array til valgte kategorier
  private jobsSubscription!: Subscription;

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.jobsSubscription = this.jobService.getAllJobs().subscribe(
      (jobs) => {
        this.jobs = jobs;
        this.applyFilters(); // Kalder applyFilters ved initialisering
      },
      (error) => {
        console.error('Fejl ved hentning af jobs:', error);
      }
    );
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    if (this.jobsSubscription) {
      this.jobsSubscription.unsubscribe();
    }
  }

  applyFilters() {
    let filtered = this.jobs;

    // Filtrer efter kategori, hvis nogle er valgt
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(job =>
        this.selectedCategories.includes(job.category)
      );
    }

    // Filtrer efter søgeterm
    if (this.searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(this.searchTerm.toLowerCase())
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
      this.selectedCategories = []; // Nulstiller valgte kategorier, hvis ingen er valgt
    }
    this.applyFilters(); // Kalder applyFilters efter at modalen er lukket
  }

  addNew() {
    this.navCtrl.navigateForward('/add-new-job');
  }

  jobDetails() {
    this.navCtrl.navigateForward('/job-details');
  }
}
