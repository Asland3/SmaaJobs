import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public pages = [
    { title: 'Hjem', url: '/home', icon: 'home' },
    { title: 'Profil', url: '/profile', icon: 'person' },
    { title: 'Chat', url: '/chat', icon: 'chatbubbles' },
    { title: 'Fortrolighedspolitik', url: '/privacy-policy', icon: 'document' },
  ];

  constructor(private router: Router, private menu: MenuController) {}

  logout() {
    this.router.navigateByUrl('/intro'); 
    this.menu.close();
  }
  

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}