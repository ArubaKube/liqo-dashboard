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

import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpinnerNgxAdapterService } from 'src/app/core/services/spinner/spinner-ngx-adapter.service';
import { NamespaceService } from "../../../namespace/services/namespace.service";
import { Pod } from "../../models/pod";
@Component({
  selector: 'app-pod-list',
  templateUrl: './pod-list.component.html',
})
export class PodListComponent implements OnInit {
  pods: Pod[] = [];
  namespaceName!: string
  constructor(
    private namespaceService: NamespaceService,
    private spinnerService: SpinnerNgxAdapterService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.spinnerService.show();
    this.namespaceName = this.route.snapshot.paramMap.get('namespaceName') || '';

    this.namespaceService.listOffloadedPods(this.namespaceName)
      .subscribe({
        next: (pods) => {
          this.pods = pods;
          this.spinnerService.hide();
        },
        error: () => {
          this.spinnerService.hide();
        }
      })
  }

  reload() {
    this.ngOnInit()
  }
}
