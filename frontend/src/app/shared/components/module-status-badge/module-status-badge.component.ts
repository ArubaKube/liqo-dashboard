import { Component, Input } from "@angular/core";

@Component({
    selector: 'module-status-badge',
    template: `
      <div>
        <div *ngIf="status == 'Established' || status == 'Success'" class="flex items-center gap-2 text-green-600">
            <svg-icon src="assets/icons/solid/check.svg" [svgClass]="'h-4 w-4'"> </svg-icon>
            <span>{{ status }}</span>
        </div>
        <div *ngIf="status == 'Pending'" class="flex items-center gap-2 text-yellow-600">
            <svg-icon src="assets/icons/solid/warning.svg" [svgClass]="'h-4 w-4'"> </svg-icon>
            <span>{{ status }}</span>
        </div>
        <div *ngIf="status == 'Error'" class="flex items-center gap-2 text-red-600">
            <svg-icon src="assets/icons/solid/exclamation-circle.svg" [svgClass]="'h-4 w-4'"> </svg-icon>
            <span>{{ status }}</span>
        </div>
        <div *ngIf="status == 'None'" class="flex items-center gap-2 text-gray-600">
            <svg-icon src="assets/icons/outline/x.svg" [svgClass]="'h-4 w-4'"> </svg-icon>
            <span>{{ status }}</span>
        </div>
      </div>
  `,
})
export class ModuleStatusBadge {
    @Input() status!: string;
}