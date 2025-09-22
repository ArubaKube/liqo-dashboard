import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AppConfigService } from "../../../core/services/config/app-config.service";

@Injectable({ providedIn: 'root' })
export class StatusService {
  apiURL = this.configService.getConfig().api?.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http: HttpClient, private configService: AppConfigService) { }


  getLiqoInfo() {
    const params = new HttpParams().set('ClusterType', 'All');
    return this.http.get<string>(`${this.apiURL}/clusters`, {
      ...this.httpOptions,
      params
    });
  }
}
