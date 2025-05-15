import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

import { AngularSvgIconModule } from "angular-svg-icon";
import { ClusterRoutingModule } from "./cluster-routing.module";
import { ClusterDetailComponent } from "./pages/cluster-detail/cluster-detail.component";
import { ResourcesGraphsComponent } from './pages/cluster-detail/components/resources-graphs/resources-graphs.component';
import { ClusterListComponent } from "./pages/cluster-list/cluster-list.component";

@NgModule({
  declarations: [
    ClusterListComponent,
    ClusterDetailComponent,
    ResourcesGraphsComponent,
  ],
  exports: [
    ClusterListComponent
  ],
  imports: [
    CommonModule,
    ClusterRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularSvgIconModule,
  ]
})
export class ClusterModule { }
