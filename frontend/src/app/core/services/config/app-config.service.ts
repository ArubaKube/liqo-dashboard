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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  /**
   *
   * @private
   */
  private config: any;

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   *
   */
  public loadConfig(): Promise<void> {
    const req = this.http
      .get('assets/config/config.json')
    return lastValueFrom(req)
      .then((el) => {
        this.config = el;
      });
  }

  /**
   *
   */
  getConfig() {
    return this.config;
  }
}

