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

import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from "@jsverse/transloco";
import { ColDef, ValueGetterParams } from "ag-grid-community";
import { Cluster } from 'src/app/modules/cluster/models/cluster';
import { getPeeringStatus } from '../../utils/utils';
import { ClusterActionsRendererComponent } from "./renderer/cluster-actions-renderer.component";
import { ClusterStatusRendererComponent } from './renderer/cluster-status-renderer.component';

const evaluateStatus = (data: ValueGetterParams) => {
  return getPeeringStatus(data.data as Cluster).toString();
}

@Component({
  selector: '[cluster-table]',
  templateUrl: './cluster-table.component.html',
})
export class ClusterTableComponent implements OnInit {
  @Input()
  public clusters: Cluster[] = [];
  columnDefs: ColDef[] = [];

  constructor(private translateService: TranslocoService) { }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'Status', valueGetter: (v) => evaluateStatus(v), cellRenderer: ClusterStatusRendererComponent },
      { headerName: 'ID', field: 'id' },
      { headerValueGetter: () => this.translateService.translate("clusters.list.clusterRoleLabel"), field: 'role' },
      { headerValueGetter: () => this.translateService.translate("clusters.list.clusterApiServerLabel"), field: 'apiServerUrl' },
      { headerValueGetter: () => this.translateService.translate("clusters.list.clusterNetworkingLatencyLabel"), field: 'networkLatency' },
      { cellStyle: { "display": "flex" }, field: '', cellRenderer: ClusterActionsRendererComponent, sortable: false, filter: false },
    ];
  }



  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
    resizable: true,
  };
}
