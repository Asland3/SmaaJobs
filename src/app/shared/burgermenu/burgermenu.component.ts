import { Component } from '@angular/core';

@Component({
  selector: 'app-burgermenu',
  templateUrl: 'burgermenu.component.html',
  styleUrls: ['burgermenu.component.scss'],
})

export class BurgermenuComponent {
  isOpen = false;

  constructor() {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    console.log('logout');
  }
}
