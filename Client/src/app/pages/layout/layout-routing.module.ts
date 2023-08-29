import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './components/home/home.component';
import { BrowseComponent } from './components/browse/browse.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AnalysticComponent } from './components/analystic/analystic.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { LessonComponent } from './components/admin/components/lesson/lesson.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { DetailComponent } from './components/detail/detail.component';
import { QuizEditorComponent } from './components/admin/components/quiz-editor/quiz-editor.component';

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
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'admin/course/:id',
        component: LessonComponent,
      },
      {
        path: 'admin/course/:id/quiz',
        component: QuizEditorComponent,
      },
      {
        path: 'quiz',
        component: QuizComponent,
      },
      {
        path: 'browse/detail/:id',
        component: DetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
