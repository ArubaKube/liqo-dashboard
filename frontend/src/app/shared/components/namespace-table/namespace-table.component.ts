import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ColDef } from "ag-grid-community";
import { Namespace } from "../../../modules/namespace/models/namespace";
import { NamespaceActionsRendererComponent } from "./renderer/namespace-actions-renderer.component";
import { NamespaceStatusRendererComponent } from "./renderer/namespace-status-renderer.component";
@Component({
  selector: '[namespace-table]',
  templateUrl: './namespace-table.component.html',
})
export class NamespaceTableComponent implements OnInit {
  @Input()
  public namespaces: Namespace[] = [];
  columnDefs: ColDef[] = []

  @Output() onReload = new EventEmitter<boolean>();

  constructor(private translateService: TranslocoService) { }

  ngOnInit(): void {
    this.columnDefs = [
      { headerValueGetter: () => this.translateService.translate("namespaces.nameLabel"), field: 'name' },
      { headerValueGetter: () => this.translateService.translate("namespaces.statusLabel"), field: 'status', cellRenderer: NamespaceStatusRendererComponent },
      { cellStyle: { "display": "flex" }, field: '', cellRenderer: NamespaceActionsRendererComponent, sortable: false, filter: false },
    ];
  }

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  reload() {
    this.onReload.emit(true);
  }
}
