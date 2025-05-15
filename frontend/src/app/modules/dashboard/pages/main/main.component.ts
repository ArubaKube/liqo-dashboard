import { Component, OnInit } from '@angular/core';
import { forkJoin } from "rxjs";
import { SpinnerNgxAdapterService } from "../../../../core/services/spinner/spinner-ngx-adapter.service";
import { UtilsService } from "../../../../core/utils/utils.service";
import { Cluster } from "../../../cluster/models/cluster";
import { ClusterService } from "../../../cluster/services/cluster.service";
import { Namespace } from "../../../namespace/models/namespace";
import { NamespaceService } from "../../../namespace/services/namespace.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class LiqoComponent implements OnInit {
  clusters: Cluster[] = [];
  namespaces: Namespace[] = [];
  constructor(
    private clusterService: ClusterService,
    private namespaceService: NamespaceService,
    private utilsService: UtilsService,
    private spinnerService: SpinnerNgxAdapterService
  ) { }

  ngOnInit(): void {
    this.spinnerService.show()
    forkJoin([
      this.clusterService.list(),
      this.namespaceService.list()
    ])
      .subscribe(
        {
          next: ([clusters, namespaces]) => {
            this.clusters = clusters;
            this.namespaces = namespaces;
            setTimeout(() => this.spinnerService.hide(), 2000);
          },
          error: () => {
            this.spinnerService.hide()
          }
        }
      )
  }

  getAverageLatency(clusters: Cluster[]) {
    if (clusters.length > 0) {
      const milliseconds = clusters.map(el => {
        if (el.networkLatency) {
          return this.utilsService.convertToMilliseconds(el.networkLatency);
        }
        return 0;
      })

      const total = milliseconds.reduce((acc, valore) => acc + valore, 0);
      return Math.round(total / milliseconds.length * 10) / 10;
    }
    return 0;
  }
}
