import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, retry } from "rxjs";
import { AppConfigService } from "../../../core/services/config/app-config.service";
import { Pod } from "../../pod/models/pod";
import { Namespace } from '../models/namespace';

@Injectable({
  providedIn: 'root'
})
export class NamespaceService {
  apiURL = this.configService.getConfig().api?.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http: HttpClient, private configService: AppConfigService) { }

  list(params?: HttpParams) {
    return this.http
      .get<Namespace[]>(this.apiURL + '/namespaces/', {
        params: {
          ...params
        },
        ...this.httpOptions
      })
      .pipe(
        map((ns: Namespace[]) => {
          return ns
        })
      );
  }

  listOffloadedPods(namespaceName?: string | number | null) {
    return this.http
      .get<Pod[]>(this.apiURL + '/namespaces/' + namespaceName + '/offloaded', {
        params: {
        },
        ...this.httpOptions
      })
      .pipe(retry(1));
  }

  get(id?: string | number | null) {
    return this.http
      .get<Namespace>(this.apiURL + '/namespaces/' + id, {
        ...this.httpOptions
      })
      .pipe(retry(1));
  }
}
