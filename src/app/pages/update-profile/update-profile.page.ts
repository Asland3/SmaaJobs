import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  user!: User;
  credentials: FormGroup | any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validators();
    this.loadUserData();
  }

  navigateBack() {
    this.navCtrl.back();
  }
  editProfilePic() {}

  async loadUserData() {
    this.authService.currentUser.subscribe(async (userData) => {
      this.user = userData;
      this.credentials.patchValue(userData);
    });
  }

  updateProfile(){
    console.log(this.credentials.value);
  }

  validators() {
    this.credentials = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      age: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      town: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get email() {
    return this.credentials?.get('email');
  }

  get firstName() {
    return this.credentials?.get('firstName');
  }

  get lastName() {
    return this.credentials?.get('lastName');
  }

  get age() {
    return this.credentials?.get('age');
  }

  get description() {
    return this.credentials?.get('description');
  }

  get town() {
    return this.credentials?.get('town');
  }

  get postalCode() {
    return this.credentials?.get('postalCode');
  }

  get phone() {
    return this.credentials?.get('phone');
  }
}
