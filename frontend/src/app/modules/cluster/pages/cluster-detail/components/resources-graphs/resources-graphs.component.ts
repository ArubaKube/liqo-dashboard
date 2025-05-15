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
