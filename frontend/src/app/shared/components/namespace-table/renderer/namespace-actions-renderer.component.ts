import { Component } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'namespace-cell-renderer-component',
  templateUrl: './namespace-actions.renderer.component.html'
})
export class NamespaceActionsRendererComponent implements ICellRendererAngularComp {
  public data!: any;

  constructor() { }

  agInit(params: ICellRendererParams<any, string>): void {
    this.data = params?.data;
  }

  refresh() {
    return false;
  }
}
