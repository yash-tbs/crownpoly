import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProHSRoutingModule } from './pro-hs-routing.module';
import { ProhsFrmmainComponent } from './prohs-frmmain/prohs-frmmain.component';


@NgModule({
  declarations: [
    ProhsFrmmainComponent
  ],
  imports: [
    CommonModule,
    ProHSRoutingModule
  ]
})
export class ProHSModule { }
