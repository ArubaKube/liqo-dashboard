import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

import { AngularSvgIconModule } from "angular-svg-icon";
import { PodListComponent } from "./pages/pod-list/pod-list.component";
import { PodRoutingModule } from "./pod-routing.module";

@NgModule({
  declarations: [
    PodListComponent,
  ],
  imports: [
    CommonModule,
    PodRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularSvgIconModule
  ]
})
export class PodModule { }
