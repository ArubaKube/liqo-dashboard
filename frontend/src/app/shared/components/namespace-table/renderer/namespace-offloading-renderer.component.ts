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
<span
      class="text-xs font-medium">
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

    getDisplay(policy?: string) {
        if (['LocalAndRemote', 'Local', 'Remote'].includes(policy || '')) {
            return this.translocoService.translate(`clusters.offloadingStrategy.strategy${policy}`);
        }
        return '-';
    }

}
