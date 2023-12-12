import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToOnAuth = () => redirectUnauthorizedTo(['on-auth']);


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
    ...canActivate(redirectUnauthorizedToOnAuth),
  },
  {
    path: 'active-chat',
    loadChildren: () =>
      import('./pages/active-chat/active-chat.module').then(
        (m) => m.ActiveChatPageModule
      ),
    ...canActivate(redirectUnauthorizedToOnAuth),
  },
  {
    path: 'on-auth',
    loadChildren: () =>
      import('./pages/on-auth/on-auth.module').then((m) => m.OnAuthPageModule),
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
        path: 'forgot-password',
        loadChildren: () =>
          import('./pages/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordPageModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./pages/register/register.module').then(
            (m) => m.RegisterPageModule
          ),
      },
    ],
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./pages/privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyPageModule
      ),
  },

  {
    path: 'add-new-job',
    loadChildren: () =>
      import('./pages/add-new-job/add-new-job.module').then(
        (m) => m.AddNewJobPageModule
      ),
    ...canActivate(redirectUnauthorizedToOnAuth),
  },
  {
    path: 'job-details',
    loadChildren: () =>
      import('./pages/job-details/job-details.module').then(
        (m) => m.JobDetailsPageModule
      ),
    path: 'home/:jobId',
    loadChildren: () => import('./pages/job-details/job-details.module').then( m => m.JobDetailsPageModule)
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
    path: 'logout-modal',
    loadChildren: () =>
      import('./modals/logout-modal/logout-modal.module').then(
        (m) => m.LogoutModalPageModule
      ),
    ...canActivate(redirectUnauthorizedToOnAuth),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
