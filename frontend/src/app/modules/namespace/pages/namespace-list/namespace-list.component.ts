import { Component, OnInit, } from '@angular/core';
import { SpinnerNgxAdapterService } from "../../../../core/services/spinner/spinner-ngx-adapter.service";
import { Namespace } from "../../models/namespace";
import { NamespaceService } from "../../services/namespace.service";
@Component({
  selector: 'app-namespace-list',
  templateUrl: './namespace-list.component.html',
})
export class NamespaceListComponent implements OnInit {
  namespaces:Namespace[] = [];
  constructor(private namespaceService: NamespaceService, private spinnerService: SpinnerNgxAdapterService) {}
  ngOnInit(): void {
    this.spinnerService.show();
    this.namespaceService.list()
      .subscribe({
        next: (namespaces) => {
          this.namespaces = namespaces;
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
