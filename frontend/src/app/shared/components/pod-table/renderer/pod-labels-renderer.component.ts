import { Component } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ModalService } from "../../../../core/services/modal.service";
import { NamespaceService } from "../../../../modules/namespace/services/namespace.service";

@Component({
  selector: 'pod-labels-renderer-component',
  template: `
      <ul class="!list-disc" *ngIf="data?.labels">
        <li *ngFor="let label of labels"><span class="font-bold">{{label.key}}: </span>{{label.value}}</li>
      </ul>
  `,
})
export class PodLabelsRendererComponent implements ICellRendererAngularComp {
  public data!: any;
  labels: any;

  constructor(private namespaceService: NamespaceService, private modalService: ModalService) {
  }

  agInit(params: ICellRendererParams<any, string>): void {
    this.data = params?.data;
    this.labels = Object.keys(params?.data?.labels).map((key) => {
      return { key: key, value: params?.data?.labels[key] };
    });
  }

  refresh() {
    return false;
  }

}
