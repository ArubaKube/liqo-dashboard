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



import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { SpinnerNgxAdapterService } from "../../../../core/services/spinner/spinner-ngx-adapter.service";
import { Cluster } from "../../models/cluster";
import { ClusterService } from "../../services/cluster.service";
import { ClusterListUtilsService } from "./utils/cluster-list-utils.service";
import { LOCAL_CLUSTER_ID } from './utils/cluster-list-utils.service';


@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
})
export class ClusterListComponent implements OnInit {
  @Input() externalStyle: string = '';
  viewMode: 'graph' | 'list' = 'graph';

  // Cluster info variables
  clusters: Cluster[] = [];
  selectedCluster: Cluster | undefined | null;

  // Chart configuration
  localNode = {
    localNodeImage: 'image:///assets/icons/outline/home.svg',
    localNodeLabel: LOCAL_CLUSTER_ID,
    localNodeSymbolSize: 40,
  }
  initialData = this.clusterListUtilsService.getInitialData(this.localNode);
  initialChartOptions: EChartsOption = this.clusterListUtilsService.getChartInitConfig(
    this.initialData
  );
  chartOptions: EChartsOption = {};

  constructor(
    private clusterService: ClusterService,
    private clusterListUtilsService: ClusterListUtilsService,
    private spinnerService: SpinnerNgxAdapterService,
    private location: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.location.queryParams.subscribe(params => {
      this.viewMode = params['view'] == 'list' ? 'list' : 'graph';
    });

    this.spinnerService.show()
    this.clusterService.list().subscribe({
      next: (clusters) => {
        this.spinnerService.hide();
        if (clusters) {
          const nodes = this.clusterListUtilsService.getNodesFromClusters(clusters, this.initialData.nodes)
          const links = this.clusterListUtilsService.getLinksFromClusters(clusters, this.initialData.links)
          const categories = this.clusterListUtilsService.getCategoriesFromClusters(clusters, this.initialData.categories)

          this.chartOptions = this.clusterListUtilsService.getEChartSeries(
            nodes,
            links,
            categories
          );

          this.clusters = clusters;
        }
      },
      error: () => {
        this.spinnerService.hide()
      }
    })
  }

  selectedChange(event: any) {
    const selected = event.selected[0];
    if (selected) {
      if (this.chartOptions.series) {
        const clusterSelected = (this.chartOptions?.series as any)[0].data[selected?.dataIndex[0]]
        if (clusterSelected.id == this.localNode.localNodeLabel) {
          this.selectedCluster = null;
        } else {
          this.selectedCluster = clusterSelected;
        }
      }
    } else {
      this.selectedCluster = null
    }
  }

  changeViewMode(viewMode: 'graph' | 'list') {
    this.viewMode = viewMode
    this.router.navigate([], { queryParams: { view: viewMode } })
  }

  reload() {
    window.location.reload();
  }
}
