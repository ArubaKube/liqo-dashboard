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
