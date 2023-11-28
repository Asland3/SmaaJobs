import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Define an interface for the category
interface Category {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-filtermodal',
  templateUrl: './filtermodal.page.html',
  styleUrls: ['./filtermodal.page.scss'],
})
export class FiltermodalPage implements OnInit {
  // Use the Category interface for the categories array
  categories: Category[] = [
    { name: 'Bilvask', selected: false },
    { name: 'Hundeluftning', selected: false },
    { name: 'Rengøring', selected: false },
    { name: 'Havearbejde', selected: false },
    { name: 'Fodre katte', selected: false },
    { name: 'Handle', selected: false }
  ];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  // Add the Category type to the parameter of the toggleCategory function
  toggleCategory(category: Category): void {
    category.selected = !category.selected;
  }

  // Function to return the selected categories and close the modal
  applyFilters(): void {
    const selectedCategories = this.categories.filter(c => c.selected).map(c => c.name);
    this.modalController.dismiss(selectedCategories);
  }

  // Function to close the modal without applying filters
  close(): void {
    this.modalController.dismiss();
  }
}
