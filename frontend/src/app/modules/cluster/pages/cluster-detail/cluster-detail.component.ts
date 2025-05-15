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
