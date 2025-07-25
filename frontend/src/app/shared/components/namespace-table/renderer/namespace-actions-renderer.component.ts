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
