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

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  convertToMilliCores(valueStr: string): number {
    const unit = valueStr[valueStr.length - 1];
    if (unit == "m") {
      return parseInt(valueStr.slice(0, -1));
    } else if (unit == 'n') {
      return parseInt(valueStr.slice(0, -1)) / 1000000;
    }

    return parseInt(valueStr) * 1000;
  }

  convertToGi(valueStr?: string): number {
    if (!valueStr) {
      return 0;
    }
    const numericValueMatch = valueStr.match(/([0-9.]+)([A-Za-z]+)/);

    if (numericValueMatch) {
      const numericValue = parseFloat(numericValueMatch[1]);
      const unitLowerCase = numericValueMatch[2].toLowerCase();

      switch (unitLowerCase) {
        case "m":
          return numericValue / 1074;
        case "mi":
          return numericValue / 1024;
        case "ki":
          return (numericValue * 8192) / 8589934592;
        case "gi":
          return numericValue;
        default:
          return 0
      }
    } else {
      return 0
    }
  }

  convertToMi(valueStr: string): number {
    const numericValueMatch = valueStr.match(/([0-9.]+)([A-Za-z]+)/);

    if (numericValueMatch) {
      const numericValue = parseFloat(numericValueMatch[1]);
      const unitLowerCase = numericValueMatch[2].toLowerCase();

      switch (unitLowerCase) {
        case "m":
          return numericValue;
        case "mi":
          return numericValue;
        case "ki":
          return numericValue / 1024;
        case "gi":
          return numericValue * 1024 * 1024;
        default:
          return 0
      }
    } else {
      return 0
    }
  }

  convertToMilliseconds(timeString: string): number {
    if (timeString.match(/^\d+ms$/)) {
      return parseInt(timeString, 10);
    } else if (timeString.match(/^\d+μs$/)) {
      //if the string is in the format "μs", extract the numeric value, divide by 1000 (to convert to milliseconds) and return the result.
      return parseInt(timeString, 10) / 1000;
    } else if (timeString.match(/^\ds$/)) {
      //if the string is in the format "s", extract the numeric value, multiply by 1000 (to convert to milliseconds) and return the result.
      return parseInt(timeString, 10) * 1000;
    } else {
      return 0;
    }
  }
}
