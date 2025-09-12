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

@Component({
  selector: 'various-info-box',
  templateUrl: './various.component.html',
  styles: [`
    :host {
      @apply bg-white w-full sm:w-auto flex flex-col p-4 rounded shadow;
    }
  `]
})

export class VariousComponent implements OnInit {
  @Input() icon?: string;
  @Input() title!: string;
  @Input() items: { label: string; value: string | string[] | Record<string, any> }[] = [];
  ngOnInit(): void { }

  get iconPath(): string {
    return `assets/icons/${this.icon}`;
  }

  //Formats array of strings
  getDisplayValue(value: string | string[] | Record<string, any>): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else if (typeof value === 'object' && value !== null) {
      return Object.entries(value).map(([k, v]) => `${k}: ${v}`).join('\n');
    }
    return value ?? '';
  }

}

