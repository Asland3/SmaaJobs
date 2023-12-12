import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AuthService } from './services/auth-service/auth.service';
import { User } from './models/user-model';
import { LogoutModalPage } from './modals/logout-modal/logout-modal.page';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user!: User;
  public pages = [
    { title: 'Hjem', url: '/home', icon: 'home', direction: 'back' },
    { title: 'Profil', url: '/profile', icon: 'person', direction: 'forward' },
    { title: 'Chat', url: '/chat', icon: 'chatbubbles', direction: 'forward' },
    {
      title: 'Fortrolighedspolitik',
      url: '/privacy-policy',
      icon: 'document',
      direction: 'forward',
    },
  ];



  constructor(
    private router: Router,
    private menu: MenuController,
    private navCtrl: NavController,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {
    defineCustomElements(window);
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((userData) => {
      this.user = userData;
    });
  }

  async logout() {
    const modal = await this.modalCtrl.create({
      component: LogoutModalPage,
      cssClass: 'small-center-modal',
      backdropDismiss: true,
    });
    await modal.present();
  }

  goToLogIn() {
    this.navCtrl.navigateBack('/start');
    this.closeMenu()
  }

  navigateToPage(page: any) {
    if (page.direction === 'forward') {
      this.navCtrl.navigateForward(page.url);
    } else if (page.direction === 'back') {
      this.navCtrl.navigateBack(page.url);
    }
    this.closeMenu()
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  closeMenu() {
    this.menu.close();
  }
}