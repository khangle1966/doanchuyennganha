import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingRoutingModule } from './loading-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoadingRoutingModule, SharedModule],
})
export class LoadingModule {}
