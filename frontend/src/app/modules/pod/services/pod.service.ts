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
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {retry} from "rxjs";
import {AppConfigService} from "../../../core/services/config/app-config.service";
import { Pod } from '../models/pod';

@Injectable({
  providedIn: 'root'
})
export class PodService {
  apiURL = this.configService.getConfig().api?.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http: HttpClient, private configService: AppConfigService) { }

  list( params?: HttpParams){
    return this.http
      .get<Pod[]>(this.apiURL + '/pods/', {
        params: {
          ...params,
        },
        ...this.httpOptions
      })
      .pipe(retry(1));
  }
  get(id?: string | number | null){
    return this.http
      .get<Pod>(this.apiURL + '/pods/'+id, {
        ...this.httpOptions
      })
      .pipe(retry(1));
  }
}
