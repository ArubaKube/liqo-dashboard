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

import { Injectable } from '@angular/core';

import { TranslocoService } from "@jsverse/transloco";
import Swal, { SweetAlertOptions } from 'sweetalert2';

interface ModalOptions {
  icon?: string,
  title?: string,
  text?: string,
  footer?: string,
  selectConf?: any,
  showCloseButton?: boolean,
  showCancelButton?: boolean,
  confirmButtonText?: string,
  denyButtonText?: string,
  confirmButtonAriaLabel?: string,
  cancelButtonText?: string,
  cancelButtonAriaLabel?: string,
  showDenyButton?: boolean,
  position?: 'top' | 'top-end',
  showClass?: {
    popup: string
  },
  hideClass?: {
    popup: string
  }
}
interface SelectConfig {
  title: string,
  values: { label: string, value: string }[]
}
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private translateService: TranslocoService) { }

  options: ModalOptions = {
    title: "Modal title",
    text: "",
    icon: "confirm",
    confirmButtonText: "ok"
  }
  setOptions(options: ModalOptions) {
    this.options = options;
  }

  async show(options?: ModalOptions) {
    const currentOptions = {
      ...this.options,
      ...options
    }
    return Swal.fire(currentOptions as SweetAlertOptions)
  }

  async showError(options?: { title: string, text: string }) {
    const currentOptions = {
      ...this.options,
      ...options,
      icon: 'error'
    }
    return Swal.fire(currentOptions as SweetAlertOptions)
  }

  async showInfo(options?: { title: string, text: string }) {
    const currentOptions = {
      ...this.options,
      ...options,
      icon: 'info'
    }

    return Swal.fire(currentOptions as SweetAlertOptions)
  }

  async showConfirm(options?: { title?: string, confirmButtonText?: string, denyButtonText?: string }) {
    const currentOptions = {
      ...this.options,
      ...options,
      showDenyButton: true,
      showCancelButton: false,
      title: options?.title ? options.title : this.translateService.translate('generic.requestConfirmText'),
      confirmButtonText: options?.confirmButtonText ? options.confirmButtonText : this.translateService.translate('generic.requestConfirmButton'),
      denyButtonText: options?.denyButtonText ? options.denyButtonText : this.translateService.translate('generic.requestCancelButton'),
    }
    return Swal.fire(currentOptions as SweetAlertOptions)
  }

  async showSelect(options?: { title?: string, inputOptions?: any, inputPlaceholder?: string, confirmButtonText?: string, denyButtonText?: string, selectConf: SelectConfig[] }) {
    const customTemplate = this.buildCustomTemplate(options?.selectConf || [])

    const currentOptions = {
      ...this.options,
      ...options,
      html: customTemplate,
      preConfirm: () => {
        const selectedValues = options?.selectConf.map((option: { title: string; }) => {
          if (option.title) {
            const selectedValue = (document.getElementById(option.title) as HTMLInputElement)?.value;
            return { value: selectedValue, label: option.title };
          }
          return null;
        });
        return selectedValues
      },
      showDenyButton: true,
      showCancelButton: false,
      title: options?.title ? options.title : this.translateService.translate('generic.requestConfirmText'),
      confirmButtonText: options?.confirmButtonText ? options.confirmButtonText : this.translateService.translate('generic.requestConfirmButton'),
      denyButtonText: options?.denyButtonText ? options.denyButtonText : this.translateService.translate('generic.requestCancelButton'),
    }
    return Swal.fire(currentOptions as SweetAlertOptions)
  }

  private buildCustomTemplate(configOptions: SelectConfig[]) {
    const customTemplate = configOptions.map(option => {
      if (option.title) {
        const selectOptions = option.values.map((value: { label: any; value: any; }) => {
          if (value.label && value.value) {
            return `<option value="${value.value}">${value.label}</option>`;
          }
          return '';
        }).join('');

        return `
          <div class="mt-2"
              <label for="${option.title}">${option.title}:</label>
              <select  id="${option.title}">
                  ${selectOptions}
              </select>
          </div>
            `;
      }
      return '';
    }).join('');

    return customTemplate;
  }
}
