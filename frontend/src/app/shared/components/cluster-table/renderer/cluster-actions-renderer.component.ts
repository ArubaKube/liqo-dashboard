import { Component } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Cluster } from "src/app/modules/cluster/models/cluster";

@Component({
  selector: 'cluster-cell-renderer-component',
  template: `
      <div class="flex">
          <button
                routerLink="/clusters/detail/{{ data.id }}"
                class="btn">
            <svg-icon src="assets/icons/outline/arrow-sm-right.svg" [svgClass]="'h-5 w-5'"> </svg-icon>
          </button>
      </div>
  `,
})
export class ClusterActionsRendererComponent implements ICellRendererAngularComp {
  public data!: Cluster;

  agInit(params: ICellRendererParams<any, string>): void {
    this.data = params?.data;
  }

  refresh() {
    return false;
  }
}
