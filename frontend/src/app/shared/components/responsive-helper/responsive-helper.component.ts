import { Component, OnInit } from '@angular/core';
import {AppConfigService} from "../../../core/services/config/app-config.service";

@Component({
  selector: 'app-responsive-helper',
  templateUrl: './responsive-helper.component.html',
  styleUrls: ['./responsive-helper.component.scss'],
})
export class ResponsiveHelperComponent implements OnInit {
  public env: any = this.configService.getConfig();
  constructor(private configService: AppConfigService) {}
  ngOnInit(): void {}
}
