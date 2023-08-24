import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './components/home/home.component';
import { BrowseComponent } from './components/browse/browse.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AnalysticComponent } from './components/analystic/analystic.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'browse',
        component: BrowseComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
