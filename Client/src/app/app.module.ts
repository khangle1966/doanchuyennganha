import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { SharedModule } from './shared/shared/shared.module';
import { loginReducer } from './ngrx/reducers/login.reducer';
import { userReducer } from './ngrx/reducers/user.reducer';
import { LoadingComponent } from './pages/loading/loading.component';
import { LoginEffect } from './ngrx/effects/login.effect';
import { profileReducer } from './ngrx/reducers/profile.reducer';
import { UserEffects } from './ngrx/effects/user.effect';
import { ProfileEffect } from './ngrx/effects/profile.effect';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({login: loginReducer, user: userReducer, profile: profileReducer}, {}),
    EffectsModule.forRoot([LoginEffect, UserEffects, ProfileEffect]),
    BrowserAnimationsModule,
    HttpClientModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    SharedModule,
    StoreModule.forRoot({login: loginReducer, user: userReducer},{}),
    
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
