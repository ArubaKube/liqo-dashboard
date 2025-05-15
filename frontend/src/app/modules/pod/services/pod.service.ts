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
