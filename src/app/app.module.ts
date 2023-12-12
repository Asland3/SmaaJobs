import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AuthService } from './services/auth-service/auth.service';


export function appInitializerFactory(authService: AuthService) {
  return () => new Promise<void>(resolve => {
    authService.initAuthListener(resolve);
  });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'smaajobs-1ddcc',
        appId: '1:697847730143:web:2953642d28d9a104773e6a',
        storageBucket: 'smaajobs-1ddcc.appspot.com',
        apiKey: 'AIzaSyAiF0RTgW2wsJWzZYhw3kd1t1uyYHawTKM',
        authDomain: 'smaajobs-1ddcc.firebaseapp.com',
        messagingSenderId: '697847730143',
        measurementId: 'G-M6HR5ZSSM0',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService, // Add AuthService here
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AuthService], // Add AuthService as a dependency for the factory
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
