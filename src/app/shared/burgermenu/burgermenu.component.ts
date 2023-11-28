import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-burgermenu',
  templateUrl: 'burgermenu.component.html',
  styleUrls: ['burgermenu.component.scss'],
})
export class BurgermenuComponent {
  isOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    console.log('logout');
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}
