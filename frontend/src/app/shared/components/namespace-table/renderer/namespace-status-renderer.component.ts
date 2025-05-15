import { Component } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'namespace-status-renderer-component',
  template: `
      <span [ngClass]="getLabelClass(data?.status)" class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{data?.status}}</span>
  `,
})
export class NamespaceStatusRendererComponent implements ICellRendererAngularComp {
  public data!: any;

  constructor() {
  }

  agInit(params: ICellRendererParams<any, string>): void {
    this.data = params?.data;
  }

  refresh() {
    return false;
  }

  getLabelClass(status: string) {
    const green = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    const pending = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    const greenMap: {[key:string]: string} = {
        'Active': green,
        'default': pending,
    }
    return greenMap[status] || greenMap['default'];
  }

}
