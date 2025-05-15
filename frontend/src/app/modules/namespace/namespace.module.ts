import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

import { AngularSvgIconModule } from "angular-svg-icon";
import { NamespaceRoutingModule } from "./namespace-routing.module";
import { NamespaceListComponent } from "./pages/namespace-list/namespace-list.component";

@NgModule({
  declarations: [
    NamespaceListComponent,
  ],
  imports: [
    CommonModule,
    NamespaceRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularSvgIconModule
  ]
})
export class NamespaceModule { }
