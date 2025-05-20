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
import { TranslocoService } from '@jsverse/transloco';
import { EChartsOption } from 'echarts';
import { UtilsService } from 'src/app/core/utils/utils.service';
import { Node } from 'src/app/modules/cluster/models/node';
import { ResourcesUsage } from '../../models/resources';

@Component({
  selector: 'resources-graphs',
  templateUrl: './resources-graphs.component.html'
})
export class ResourcesGraphsComponent implements OnInit {
  @Input() node!: Node;
  cpuGraph: EChartsOption = {}
  memoryGraph: EChartsOption = {}

  constructor(
    private utilsService: UtilsService,
    private translateService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.cpuGraph = this.getGraphConfig(
      this.translateService.translate('clusters.details.virtualNodeCpuUsage'),
      {
        used: this.utilsService.convertToMilliCores(this.node.used.cpu),
        total: this.utilsService.convertToMilliCores(this.node.capacity.cpu),
      },
      `${this.translateService.translate('clusters.details.cpuUsage')} (Millicores)`
    );
    this.memoryGraph = this.getGraphConfig(
      this.translateService.translate('clusters.details.virtualNodeMemoryUsage'),
      {
        used: parseFloat(this.utilsService.convertToGi(this.node.used.memory).toFixed(2)),
        total: parseFloat(this.utilsService.convertToGi(this.node.capacity.memory).toFixed(2)),
      },
      `${this.translateService.translate('clusters.details.ramUsage')} (Gi)`,
    )
  }

  getGraphConfig(title: string, resources: ResourcesUsage, unit: string): EChartsOption {
    return {
      title: {
        text: title,
        subtext: unit,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Resources',
          type: 'pie',
          radius: '50%',
          data: [
            { value: resources.used, name: this.translateService.translate('generic.used') },
            { value: resources.total - resources.used, name: this.translateService.translate('generic.free') },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }

        }

      ]
    }
  }
}
