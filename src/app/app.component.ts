import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public pages = [
    { title: 'Hjem', url: '/home', icon: 'home', direction: 'back' },
    { title: 'Profil', url: '/profile', icon: 'person', direction: 'forward' },
    { title: 'Chat', url: '/chat', icon: 'chatbubbles', direction: 'forward' },
    { title: 'Fortrolighedspolitik', url: '/privacy-policy', icon: 'document', direction: 'forward' },
  ];

  constructor(private router: Router, private menu: MenuController, private navCtrl: NavController) {}

  logout() {
    this.navCtrl.navigateBack('/start'); 
    this.menu.close();
  }
  
  navigateToPage(page: any) {
    if (page.direction === 'forward') {
      this.navCtrl.navigateForward(page.url);
    } else if (page.direction === 'back') {
      this.navCtrl.navigateBack(page.url);
    }
    this.menu.close();
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  closeMenu() {
    this.menu.close();
  }
}