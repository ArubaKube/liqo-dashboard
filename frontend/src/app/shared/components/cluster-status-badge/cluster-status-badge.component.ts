import { Component, Input } from "@angular/core";
import { PeeringStatus } from "src/app/shared/consts/peering";

@Component({
    selector: 'cluster-status-badge',
    template: `
      <div>
        <div *ngIf="peeringStatus == 'Ready'" class="flex items-center gap-2 text-green-600">
            <svg-icon src="assets/icons/solid/check.svg" [svgClass]="'h-4 w-4'"> </svg-icon>
            <span>{{ peeringStatus }}</span>
        </div>
        <div *ngIf="peeringStatus == 'Pending'" class="flex items-center gap-2 text-yellow-600">
            <svg-icon src="assets/icons/solid/warning.svg" [svgClass]="'h-4 w-4'"> </svg-icon>
            <span>{{ peeringStatus }}</span>
        </div>
        <div *ngIf="peeringStatus == 'Error'" class="flex items-center gap-2 text-red-600">
            <svg-icon src="assets/icons/solid/exclamation-circle.svg" [svgClass]="'h-4 w-4'"> </svg-icon>
            <span>{{ peeringStatus }}</span>
        </div>
      </div>
  `,
})
export class ClusterStatusBadge {
    @Input() peeringStatus!: PeeringStatus;
}