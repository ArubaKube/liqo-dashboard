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
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConfigService} from "../config/app-config.service";
import {retry} from "rxjs";
import {Cluster} from "../../../modules/cluster/models/cluster";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  apiURL = this.configService.getConfig().api?.url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http: HttpClient, private configService: AppConfigService) { }

  connect( body: { kubeconfig: string }){
    return this.http
        .post<Cluster>(this.apiURL + '/connections/', body,{
          params: {
          },
          ...this.httpOptions
        })
        .pipe(retry(1));
  }

  // disconnect( body: { kubeconfig: string }){
  //   return this.http
  //       .post<any>(this.apiURL + '/connections/', body,{
  //         params: {
  //         },
  //         ...this.httpOptions
  //       })
  //       .pipe(retry(1));
  // }

}
