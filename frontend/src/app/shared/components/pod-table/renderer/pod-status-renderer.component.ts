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

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import {Component} from "@angular/core";
import {NamespaceService} from "../../../../modules/namespace/services/namespace.service";
import {ModalService} from "../../../../core/services/modal.service";

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

  // No logic for refresh is provided.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
