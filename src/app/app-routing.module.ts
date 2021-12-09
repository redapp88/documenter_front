import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from "./public/body/header/header.component";
import {FooterComponent} from "./public/body/footer/footer.component";
import {LoginComponent} from "./public/login/login.component";
import {SubscribeComponent} from "./public/subscribe/subscribe.component";
import {DocVerifyPublicComponent} from "./public/doc-verify-public/doc-verify-public.component";
import {HeaderUserComponent} from "./user/body/header-user/header-user.component";
import {DocumentsUserComponent} from "./user/documents-user/documents-user.component";
import {UserGuard} from "./guards/user.guard";
import {LeftSidebarComponent} from "./user/body/left-sidebar/left-sidebar.component";
import {FoldersUserComponent} from "./user/folders-user/folders-user.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {DashboardUserComponent} from "./user/dashboard-user/dashboard-user.component";
import {EditPasswordComponent} from "./user/edit-password/edit-password.component";
import {LeftSidebar2Component} from "./user/body/left-sidebar2/left-sidebar2.component";
import {AppGuideComponent} from "./public/app-guide/app-guide.component";
import {AboutComponent} from "./public/about/about.component";
import {ContactComponent} from "./public/contact/contact.component";

const routes: Routes = [
  { path: '', redirectTo: 'public/login', pathMatch: 'full' },
  // public Area
  {path: 'public/home',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: DocVerifyPublicComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  {path: 'public/login',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: LoginComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  {path: 'public/guide',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: AppGuideComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  {path: 'public/about',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: AboutComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  {path: 'public/contact',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: ContactComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},

  {path: 'public/subscribe',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: SubscribeComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  // UserArea



  {path: 'user/folders',canActivate:[UserGuard],
    children: [
      {path: '', component: HeaderUserComponent, outlet: 'page_header'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
      {path: '', component: LeftSidebar2Component, outlet: 'page_left_sidebar',
        children: [{path: '', component: FoldersUserComponent, outlet: 'user_body'},]},
    ]},

  {path: 'user/folders/:id',canActivate:[UserGuard],
    children: [
      {path: '', component: HeaderUserComponent, outlet: 'page_header'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
      {path: '', component: LeftSidebar2Component, outlet: 'page_left_sidebar',
        children: [{path: '', component: DocumentsUserComponent, outlet: 'user_body'},]},
    ]},

  {path: 'user/profile',canActivate:[UserGuard],
    children: [
      {path: '', component: HeaderUserComponent, outlet: 'page_header'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
      {path: '', component: LeftSidebar2Component, outlet: 'page_left_sidebar',
        children: [{path: '', component: ProfileComponent, outlet: 'user_body'},]},
    ]},
  {path: 'user/dashboard',canActivate:[UserGuard],
    children: [
      {path: '', component: HeaderUserComponent, outlet: 'page_header',

      },

      {path: '', component: LeftSidebar2Component, outlet: 'page_left_sidebar',
        children: [{path: '', component: DashboardUserComponent, outlet: 'user_body'},]},

      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  {path: 'user/edit-password',canActivate:[UserGuard],
    children: [
      {path: '', component: HeaderUserComponent, outlet: 'page_header'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
      {path: '', component: LeftSidebar2Component, outlet: 'page_left_sidebar',
        children: [{path: '', component: EditPasswordComponent, outlet: 'user_body'},]},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
