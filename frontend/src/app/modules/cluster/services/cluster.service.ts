import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { retry } from "rxjs";
import { AppConfigService } from "../../../core/services/config/app-config.service";
import { Cluster } from "../models/cluster";
import { Node } from "../models/node";

@Injectable({
  providedIn: 'root'
})
export class ClusterService {
  apiURL = this.configService.getConfig().api?.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http: HttpClient, private configService: AppConfigService) { }

  list(params?: HttpParams) {
    return this.http
      .get<Cluster[]>(this.apiURL + '/clusters/', {
        params: {
          ...params
        },
        ...this.httpOptions
      })
      .pipe(retry(1));
  }

  listNodes(clusterId: string) {
    return this.http
      .get<Node[]>(this.apiURL + '/clusters/' + clusterId + '/nodes', {
        params: {
        },
        ...this.httpOptions
      })
      .pipe(retry(1));
  }

  get(id?: string | number | null) {
    return this.http
      .get<Cluster>(this.apiURL + '/clusters/' + id, {
        ...this.httpOptions
      })
      .pipe(retry(1));
  }
}
