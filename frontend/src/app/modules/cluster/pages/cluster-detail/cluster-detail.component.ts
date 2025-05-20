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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { catchError, forkJoin } from "rxjs";
import { PeeringStatus } from 'src/app/shared/consts/peering';
import { getPeeringStatus } from 'src/app/shared/utils/utils';
import { Cluster } from "../../models/cluster";
import { Node } from "../../models/node";
import { ClusterService } from "../../services/cluster.service";

@Component({
  selector: 'app-cluster-detail',
  templateUrl: './cluster-detail.component.html',
})
export class ClusterDetailComponent implements OnInit {
  cluster: Cluster | undefined;
  nodes: Node[] = [];
  clusterId: number | string | null | undefined;
  peeringStatus!: PeeringStatus;

  constructor(
    private route: ActivatedRoute,
    private clusterService: ClusterService
  ) {
  }

  ngOnInit(): void {
    this.clusterId = this.route.snapshot.paramMap.get('id');

    forkJoin([
      this.clusterService.get(this.clusterId),
      this.clusterService.listNodes(this.clusterId ? this.clusterId : '').pipe(
        catchError(() => {
          //if list nodes failed, return empty array and continue
          return [];
        }),
      )
    ]).subscribe(
      {
        next: ([cluster, nodes]) => {
          this.cluster = cluster;
          this.nodes = nodes;
          this.peeringStatus = getPeeringStatus(this.cluster);
        }
      }
    )

  }

}
