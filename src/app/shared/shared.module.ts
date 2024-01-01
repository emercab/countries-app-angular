import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ButtonsMenuComponent } from './components/buttons-menu/buttons-menu.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AboutPageComponent,
    ButtonsMenuComponent,
    ContactPageComponent,
    HomePageComponent,
    LoadingComponent,
    SearchBoxComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    AboutPageComponent,
    ButtonsMenuComponent,
    ContactPageComponent,
    HomePageComponent,
    LoadingComponent,
    SearchBoxComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
