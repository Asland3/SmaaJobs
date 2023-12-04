import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }
}
