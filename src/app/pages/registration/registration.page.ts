import { Component, ElementRef, ViewChild } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import Swiper from 'swiper';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined; 
  swiper?: Swiper;


  constructor(private navCtrl: NavController) { }

  swiperReady() {
    // Wait for the component to render completely
    setTimeout(() => {
      this.swiper = this.swiperRef?.nativeElement.swiper;
    }, 500); 
  }


  swipeNext() {
    this.swiper?.slideNext();
  }

  swipeBack() {
    this.swiper?.slidePrev();
  }

}
