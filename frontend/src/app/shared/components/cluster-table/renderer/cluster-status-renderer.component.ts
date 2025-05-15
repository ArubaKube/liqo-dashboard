import { Component } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { PeeringStatus } from "src/app/shared/consts/peering";

@Component({
    selector: 'cluster-status-renderer',
    template: `
      <div>
        <cluster-status-badge [peeringStatus]="peeringStatus"/>
      </div>
  `,
})
export class ClusterStatusRendererComponent implements ICellRendererAngularComp {
    public peeringStatus!: PeeringStatus;

    agInit(params: ICellRendererParams<any, string>): void {
        this.peeringStatus = params?.value as PeeringStatus;
    }

    refresh() {
        return false;
    }
}