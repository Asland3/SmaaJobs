import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CATEGORIES, Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-filtermodal',
  templateUrl: './filtermodal.page.html',
  styleUrls: ['./filtermodal.page.scss'],
})
export class FiltermodalPage implements OnInit {
  categories: Category[] = CATEGORIES;

  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  // Add the Category type to the parameter of the toggleCategory function
  toggleCategory(category: Category): void {
    category.selected = !category.selected;
  }

  // Function to return the selected categories and close the modal
  applyFilters(): void {
    const selectedCategories = this.categories
      .filter((c) => c.selected)
      .map((c) => c.name);
    this.modalController.dismiss(selectedCategories);
  }

  // Function to close the modal without applying filters
  close(): void {
    this.modalController.dismiss();
  }
}
