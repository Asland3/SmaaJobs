import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'start',
    loadChildren: () =>
      import('./pages/start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canLoad: [IntroGuard],
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./pages/intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatPageModule),
  },
  {
    path: 'active-chat',
    loadChildren: () =>
      import('./pages/active-chat/active-chat.module').then(
        (m) => m.ActiveChatPageModule
      ),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login/login.module').then((m) => m.LoginPageModule),
      },
      //{
      //   path: 'register',
      //   loadChildren: () =>
      //     import('./pages/register/register.module').then(
      //       (m) => m.RegisterPageModule
      //     ),
      // },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./pages/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordPageModule
          ),
      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ), // 404 page
  },
  {
    path: 'forgot-password-modal',
    loadChildren: () =>
      import(
        './modals/forgot-password-modal/forgot-password-modal.module'
      ).then((m) => m.ForgotPasswordModalPageModule),
  },
  {
    path: 'filtermodal',
    loadChildren: () =>
      import('./modals/filtermodal/filtermodal.module').then(
        (m) => m.FiltermodalPageModule
      ),
  },
  {
    path: 'email-password',
    loadChildren: () => import('./pages/register/email-password/email-password.module').then( m => m.EmailPasswordPageModule)
  },
  {
    path: 'name-picture',
    loadChildren: () => import('./pages/register/name-picture/name-picture.module').then( m => m.NamePicturePageModule)
  },
  {
    path: 'about-you',
    loadChildren: () => import('./pages/register/about-you/about-you.module').then( m => m.AboutYouPageModule)
  },
  {
    path: 'adress',
    loadChildren: () => import('./pages/register/adress/adress.module').then( m => m.AdressPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
