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

import { Component, OnInit, Input } from '@angular/core';
import { ColDef } from "ag-grid-community";

export interface ForeignCluster {
  id: string;
  role: 'Consumer' | 'Provider' | 'ConsumerAndProvider' | 'Unknown';
  networkingStatus: string;
  authenticationStatus: string;
  offloadingStatus: string;
}

@Component({
  selector: '[peering-table]',
  templateUrl: './peering-table.component.html',
})
export class PeeringTableComponent implements OnInit {
  @Input() peerings: Record<string, any>[] | null = []; constructor() { }
  //public peerings: ForeignCluster[] = [];

  columnDefs: ColDef[] = [];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  ngOnInit(): void {
    console.log(this.peerings)
    /* this.peerings = [
      {
        id: 'cluster-1',
        role: 'Consumer',
        networkingStatus: 'Unhealty',
        authenticationStatus: 'Unhealthy',
        offloadingStatus: 'Unhealthy'
      },
      {
        id: 'cluster-2',
        role: 'Provider',
        networkingStatus: 'Healthy',
        authenticationStatus: 'Healthy',
        offloadingStatus: 'Healthy'
      },
      {
        id: 'cluster-3',
        role: 'ConsumerAndProvider',
        networkingStatus: 'Unhealty',
        authenticationStatus: 'Unhealthy',
        offloadingStatus: 'Unhealthy'
      }
    ]; */

    this.columnDefs = [
      { headerName: 'ID', field: 'clusterID' },
      { headerName: 'Role', field: 'role' },
      { headerName: 'Networking Status', field: 'networkingStatus' },
      { headerName: 'Authentication Status', field: 'authenticationStatus' },
      { headerName: 'Offloading Status', field: 'offloadingStatus' },
    ];
  }


  reload() {
    this.ngOnInit()
  }
}
