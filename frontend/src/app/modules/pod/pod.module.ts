/**
 * Copyright 2025 ArubaKube S.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
