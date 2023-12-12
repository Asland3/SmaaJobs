export class Category {
  id: number;
  name: string;
  selected?: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.selected = false;
  }
}

export const CATEGORIES: Category[] = [
  new Category(1, 'Bil vask'),
  new Category(2, 'Hundeluftning'),
  new Category(3, 'Rengøring'),
  new Category(4, 'Havearbejde'),
  new Category(5, 'Børnepasning'),
  new Category(6, 'Fodre kat'),
  new Category(7, 'Handle ind'),
  new Category(8, 'Andet'),
];
