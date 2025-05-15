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
