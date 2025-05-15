import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LiqoComponent } from './pages/main/main.component';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClusterModule } from "../cluster/cluster.module";
import { HeaderComponent } from './components/header/header.component';
import { StatComponent } from './components/stat/stat.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LiqoComponent,
    HeaderComponent,
    StatComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    ClusterModule,
  ],
})
export class DashboardModule { }
