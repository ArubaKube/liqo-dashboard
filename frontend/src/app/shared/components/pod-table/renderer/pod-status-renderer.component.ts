import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import {Component} from "@angular/core";
import {NamespaceService} from "../../../../modules/namespace/services/namespace.service";
import {ModalService} from "../../../../core/services/modal.service";
import {data} from "autoprefixer";

@Component({
  selector: 'pod-status-renderer-component',
  template: `
      <span [ngClass]="getLabelClass(data?.status)" class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded" >{{data?.status}}</span>`,
})
export class PodStatusRendererComponent implements ICellRendererAngularComp {
  public data!: any;

  constructor(private namespaceService: NamespaceService, private modalService: ModalService) {
  }

  agInit(params: ICellRendererParams<any, string>): void {
    this.data = params?.data;
  }

  refresh(params: ICellRendererParams) {
    return false;
  }

  getLabelClass(status: string) {
    const green = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    const pending = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    const greenMap: {[key:string]: string} = {
        'Running': green,
        'default': pending,
    }
    return greenMap[status] || greenMap['default'];
  }

}
