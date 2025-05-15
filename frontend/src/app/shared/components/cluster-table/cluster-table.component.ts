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
      { headerName: 'id', field: 'id' },
      { headerValueGetter: () => this.translateService.translate("clusters.list.clusterNameLabel"), field: 'name' },
      { headerValueGetter: () => this.translateService.translate("clusters.list.clusterPeeringTypeLabel"), field: 'peeringType' },
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
