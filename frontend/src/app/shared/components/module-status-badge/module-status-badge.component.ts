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

import { Component, Input } from "@angular/core";

@Component({
    selector: 'module-status-badge',
    template: `
      <div>
        <div *ngIf="status == 'Established' || status == 'Success' || status == 'Ready'" class="flex items-center gap-2 text-green-600">
            <svg-icon src="assets/icons/solid/check.svg" [svgClass]="'h-4 w-4'"> </svg-icon>
            <span>{{ status }}</span>
        </div>
        <div *ngIf="status == 'Pending'" class="flex items-center gap-2 text-yellow-600">
            <svg-icon src="assets/icons/solid/warning.svg" [svgClass]="'h-4 w-4'"> </svg-icon>
            <span>{{ status }}</span>
        </div>
        <div *ngIf="status == 'Error' || status == 'NotReady' || status == 'SomeNotReady'" class="flex items-center gap-2 text-red-600">
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