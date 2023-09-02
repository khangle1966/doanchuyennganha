import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileState } from 'src/app/ngrx/states/profile.state';

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

  pages: Page[] = [
    {
      id: 0,
      name: 'HOME',
      link: 'base/home',
      icon: 'tuiIconHomeLarge',
    },
    {
      id: 1,
      name: 'LEARNING',
      link: 'base/learning',
      icon: 'tuiIconBookmarkLarge',
    },
    {
      id: 2,
      name: 'BROWSE COURSES',
      link: 'base/browse',
      icon: 'tuiIconBookOpenLarge',
    },
    {
      id: 3,
      name: 'PROFILE',
      link: 'base/profile',
      icon: 'tuiIconUserLarge',
    },
    {
      id: 4,
      name: 'CART',
      link: 'base/cart',
      icon: 'tuiIconShoppingCartLarge',
    },
    {
      id: 5,
      name: 'ADMIN',
      link: 'base/admin',
      icon: 'tuiIconCpuLarge',
    },
    {
      id: 6,
      name: 'SETTINGS',
      link: 'base/settings',
      icon: 'tuiIconSettingsLarge',
    },
  ];

  value = '';
  pageSelected: number = 0;
  constructor(
    private router: Router,
    private store: Store<{ profile: ProfileState }>
  ) {
    this.router.events.subscribe((val) => {
      this.router.url === '/base/home' ? (this.pageSelected = 0) : null;
      this.router.url.includes('/base/learning')
        ? (this.pageSelected = 1)
        : null;
      this.router.url.includes('/base/browse') ? (this.pageSelected = 2) : null;
      this.router.url === '/base/profile' ? (this.pageSelected = 3) : null;
      this.router.url === '/base/cart' ? (this.pageSelected = 4) : null;
      this.router.url.includes('/base/admin') ? (this.pageSelected = 5) : null;
      this.router.url === '/base/settings' ? (this.pageSelected = 6) : null;
    });
    // this.store.select('profile', 'profile').subscribe((val) => {
    //   if (val.role != 'admin') {
    //     this.pages.splice(4, 1);
    //     this.pages[this.pages.length - 1].id = this.pages.length - 1;
    //   }
    // });
  }

  selected(index: number) {
    this.router.navigate([this.pages[index].link]);
  }
}
