import { Injectable } from '@angular/core';
import { TranslocoService } from "@jsverse/transloco";
import { EChartsOption } from "echarts";
import { PEER_ERROR_ICON, PEER_SUCCESS_ICON, PEER_WARNING_ICON, PeeringStatus } from 'src/app/shared/consts/peering';
import { getPeeringStatus } from 'src/app/shared/utils/utils';
import { AppConfigService } from "../../../../../core/services/config/app-config.service";
import { Cluster } from "../../../models/cluster";

@Injectable({
  providedIn: 'root'
})
export class ClusterListUtilsService {

  constructor(
    private translateService: TranslocoService,
    private configService: AppConfigService) { }

  getChartInitConfig({ categories, nodes, links }: any): EChartsOption {
    return {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (v: any) => {
          let template = ""
          if (v.data.latency) {
            template = `
                <div class="flex flex-col w-72 p-2" >
                  ${v?.data?.latency ? `
                    <div class="flex justify-between flex-row">
                        <span class="font-bold">
                            <i class="fa-solid fa-gauge"></i>
                           ${this.translateService.translate("clusters.list.latency")}:
                        </span>
                        <span>${v?.data?.latency}</span>
                    </div>`
                : ""}
                </div>
              `
          } else {
            template = `
                <div class="flex flex-col w-72 p-2">
                  <div class="flex justify-between flex-row">
                    <span class="font-bold">
                        <i class="fa-regular fa-file-lines"></i>
                        ID:
                    </span>
                    <span>${v?.data?.id}</span> </div>
                  <div class="flex-grow border-t border-gray-400"></div>
                ${v?.data?.role ? `
                    <div class="flex justify-between flex-row mt-2">
                        <span class="font-bold">
                            <i class="fa-solid fa-subscript"></i>
                            ${this.translateService.translate("clusters.list.clusterRoleLabel")}:
                        </span>
                        <span>${v?.data?.role}</span>
                    </div>
                    `
                : ""}
                    <div class="flex-grow border-t border-gray-400"></div>
                    ${v?.data ? `
                      <div class="flex justify-between flex-row mt-2">
                          <span class="font-bold">
                              <i class="fa-solid fa-heart"></i>
                              Status:
                          </span>
                          <span>${getPeeringStatus(v?.data)}</span>
                      </div>
                    `
                : ""}
                  <div class="flex-grow border-t border-gray-400"></div>
                  ${v?.data?.apiServerStatus ? `
                    <div class="flex justify-between flex-row mt-2">
                        <span class="font-bold">
                            <i class="fa-solid fa-network-wired"></i>
                            ${this.translateService.translate("clusters.list.clusterApiServerLabel")}:
                        </span>
                        <span>${v?.data?.apiServerStatus}</span> </div>`
                : ""}
                  <div class="flex-grow border-t border-gray-400"></div>
                  ${v?.data?.networkStatus ? `
                    <div class="flex justify-between flex-row mt-2">
                        <span class="font-bold">
                            <i class="fa-solid fa-globe"></i>
                            ${this.translateService.translate("clusters.list.clusterNetworkingLabel")}:
                        </span>
                        <span>${v?.data?.networkStatus}</span>
                     </div>`
                : ""}
                  <div class="flex-grow border-t border-gray-400"></div>
                  ${v?.data?.authenticationStatus ? `
                    <div class="flex justify-between flex-row mt-2">
                        <span class="font-bold">
                            <i class="fa-solid fa-lock"></i>
                            ${this.translateService.translate("clusters.list.clusterAuthLabel")}:
                        </span>
                        <span>${v?.data?.authenticationStatus}</span> </div>`
                : ""}
                  <div class="flex-grow border-t border-gray-400"></div>
                  ${v?.data?.offloadingStatus ? `
                    <div class="flex justify-between flex-row mt-2">
                        <span class="font-bold">
                            <i class="fa-solid fa-anchor"></i>
                            ${this.translateService.translate("clusters.list.clusterOffloadingLabel")}:
                        </span>
                        <span>${v?.data?.offloadingStatus}</span> </div>`
                : ""}
              `
          }

          return template;
        },
      },
      legend: {
        show: false
      },
      series: this.getEChartSeries(nodes, links, categories).series
    }
  }

  getInitialData(localNode: any) {
    return {
      nodes: [
        {
          id: "main",
          name: localNode.localNodeLabel,
          symbolSize: localNode.localNodeSymbolSize,
          x: -87.93029,
          y: -6.8120565,
          category: 0,
        }
      ],
      links: [{}],
      categories: [
        {
          name: localNode.localNodeLabel,
          symbol: localNode.localNodeImage,
        }
      ]
    }
  }

  getNodesFromClusters(clusters: Cluster[], existingNodes: any) {
    const startPosition = {
      x: 0,
      y: 0
    }

    return [...clusters.map((cluster: Cluster, index: number) => {
      startPosition.x = startPosition.x + 100;
      return {
        id: cluster.id,
        name: cluster.id,
        role: cluster.role,
        apiServerUrl: cluster.apiServerUrl,
        apiServerStatus: cluster.apiServerStatus,
        networkStatus: cluster.networkStatus,
        authenticationStatus: cluster.authenticationStatus,
        offloadingStatus: cluster.offloadingStatus,
        networkLatency: cluster.networkLatency,
        symbolSize: 60,
        x: startPosition.x,
        y: startPosition.y,
        category: index + 1
      }
    }), ...existingNodes]
  }

  getLinksFromClusters(clusters: Cluster[], existingLinks: any) {
    return [...clusters.map((cluster: Cluster) => {
      return {
        source: "main",
        target: cluster.id,
        lineStyle: {
          color: "target",
        },
        latency: cluster.networkLatency,
      }
    }), ...existingLinks]
  }

  getClusterSymbolFromCluster(cluster: Cluster) {
    const peeringStatus = getPeeringStatus(cluster);
    if (peeringStatus == PeeringStatus.PENDING) {
      return PEER_WARNING_ICON;
    } else if (peeringStatus == PeeringStatus.ERROR) {
      return PEER_ERROR_ICON;
    }
    return PEER_SUCCESS_ICON;
  }

  getCategoriesFromClusters(clusters: Cluster[], existingCategories: any) {
    return [...existingCategories, ...clusters.map((cluster: Cluster) => {
      return {
        "name": cluster.id,
        "symbol": this.getClusterSymbolFromCluster(cluster)
      }
    })]
  }

  getEChartSeries(nodes: any, links: any, categories: any): EChartsOption {
    return {
      series: [
        {
          name: 'Liqo topology',
          type: 'graph',
          draggable: false,
          selectedMode: 'single',
          layout: 'force',
          force: {
            edgeLength: 120,
            repulsion: 60,
          },
          data: nodes,
          links: links,
          categories: categories,
          roam: true,
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 10
            }
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
          },
          labelLayout: {
            hideOverlap: true
          },
          scaleLimit: {
            min: 0.4,
            max: 2
          },
          lineStyle: {
            color: 'source',
            width: 2,
            curveness: 0
          }
        }
      ]
    }
  }
}
