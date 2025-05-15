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

