import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from  './login-component/login-component.component';
import { RegisterComponentComponent } from  './register-component/register-component.component';
import { WelcomeComponentComponent } from './welcome-component/welcome-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeAuthComponent } from './home-auth/home-auth.component'
import { HomeAuthPostComponent } from './home-auth/home-auth-post/home-auth-post.component'
import { AuthGuardGuard } from './authGuard/auth-guard.guard'
import { ChatComponentComponent } from './home-auth/chat-component/chat-component.component'


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponentComponent
  },
  {
    path: 'login',
    component: WelcomeComponentComponent
  },
  {
    path: '',
    canActivate: [AuthGuardGuard],
    children: [{
      path: '',
      component: HomeAuthComponent
    },
    {
      path: 'chat',
      component: ChatComponentComponent
    }]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeAuthPostComponent, HomeAuthComponent, LoginComponentComponent, RegisterComponentComponent, WelcomeComponentComponent, PageNotFoundComponent];
