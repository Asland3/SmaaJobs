import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-burgermenu',
  templateUrl: 'burgermenu.component.html',
  styleUrls: ['burgermenu.component.scss'],
})
export class BurgermenuComponent {
  public pages = [
    { title: 'Hjem', url: '/home', icon: 'home' },
    { title: 'Profil', url: '/profile', icon: 'person' },
    { title: 'Chat', url: '/chat', icon: 'chatbubbles' },
    { title: 'Fortrolighedspolitik', url: '/privacy-policy', icon: 'document' },
  ];

  constructor(private router: Router) {}

  logout() {
    console.log('logout');
    // Clear user data here (e.g., localStorage, cookies, etc.)
    this.router.navigateByUrl('/intro'); // Replace '/login' with your actual login route
  }
  

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}
