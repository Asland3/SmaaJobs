import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./pages/intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./pages/register/register.module').then(
            (m) => m.RegisterPageModule
          ),
      },
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
    path: 'start',
    loadChildren: () =>
      import('./pages/start/start.module').then((m) => m.StartPageModule),
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
