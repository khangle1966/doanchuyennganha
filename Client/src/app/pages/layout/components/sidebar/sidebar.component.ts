import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface Page {
  id: number;
  name: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
  readonly searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });

  readonly pages: Page[] = [
    {
      id: 0,
      name: 'HOME',
      link: 'base/home',
      icon: 'tuiIconHomeLarge',
    },
    {
      id: 1,
      name: 'BROWSE COURSES',
      link: 'base/browse',
      icon: 'tuiIconBookOpenLarge',
    },
    {
      id: 2,
      name: 'PROFILE',
      link: 'base/profile',
      icon: 'tuiIconUserLarge',
    },
    {
      id: 3,
      name: 'CART',
      link: 'base/cart',
      icon: 'tuiIconShoppingCartLarge',
    },
    {
      id: 4,
      name: 'ADMIN',
      link: 'base/admin',
      icon: 'tuiIconCpuLarge',
    },
    {
      id: 5,
      name: 'SETTINGS',
      link: 'base/settings',
      icon: 'tuiIconSettingsLarge',
    },
  ];

  value = '';
  pageSelected: number = 0;
  constructor(private router: Router) {
    this.router.url === '/base/home' ? (this.pageSelected = 0) : null;
    this.router.url === '/base/browse' ? (this.pageSelected = 1) : null;
    this.router.url === '/base/profile' ? (this.pageSelected = 2) : null;
    this.router.url === '/base/cart' ? (this.pageSelected = 3) : null;
    this.router.url === '/base/settings' ? (this.pageSelected = 4) : null;
  }

  selected(index: number) {
    this.pageSelected = index;
    // console.log([this.pages[index].link]);
    this.router.navigate([this.pages[index].link]);
  }
}
