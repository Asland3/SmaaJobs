import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { CATEGORIES, Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-new-job',
  templateUrl: './add-new-job.page.html',
  styleUrls: ['./add-new-job.page.scss'],
})
export class AddNewJobPage implements OnInit {
  public imageURIs: string[] = ['', '', ''];
  categories: Category[] = [];
  selectedCategoryId: number | undefined;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.categories = CATEGORIES;
  }

  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }

  async openCamera(cardIndex: number) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    if (image.webPath) {
      this.imageURIs[cardIndex] = image.webPath;
    } else {
      // Håndter situationen, hvor der ikke er noget billede (f.eks. brugeren annullerede)
      console.log('No image selected');
    }
  }

  removePhoto(cardIndex: number) {
    this.imageURIs[cardIndex] = '';
  }

  countSelectedImages(): number {
    return this.imageURIs.filter((uri) => uri !== '').length;
  }
}
