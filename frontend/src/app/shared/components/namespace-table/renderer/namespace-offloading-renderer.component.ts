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
import { TranslocoService } from '@jsverse/transloco';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'namespace-offloading-renderer',
    template: `
<span [ngClass]="getClass(data?.offloading?.podOffloadingStrategy)"
      class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
    {{ getDisplay(data?.offloading?.podOffloadingStrategy) }}
</span>
  `,
})


export class NamespaceOffloadingRendererComponent implements ICellRendererAngularComp {
    public data!: any;

    constructor(private translocoService: TranslocoService) {
    }

    agInit(params: ICellRendererParams<any>): void {
        this.data = params.data;
    }

    refresh() {
        return false;
    }

    getClass(policy?: string) {
        switch (policy) {
            case 'LocalAndRemote': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Local': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Remote': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    }

    getDisplay(policy?: string) {
        if (['LocalAndRemote', 'Local', 'Remote'].includes(policy || '')) {
            return this.translocoService.translate(`clusters.offloadingStrategy.strategy${policy}`);
        }
        return '-';
    }

}
