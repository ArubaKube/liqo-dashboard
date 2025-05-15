import { Injectable } from '@angular/core';
import {Spinner, SpinnerConfig} from "./spinner";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerNgxAdapterService implements Spinner{

  constructor(private spinner: NgxSpinnerService) { }

  show(config?: SpinnerConfig) {
    return this.spinner.show()
  }

  hide() {
    return this.spinner.hide()
  }
}
