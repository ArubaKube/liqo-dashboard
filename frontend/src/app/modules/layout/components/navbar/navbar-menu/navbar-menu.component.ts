import { Component, OnInit } from '@angular/core';
import { TranslocoService } from "@jsverse/transloco";
import { Observable } from 'rxjs';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { FLAG_ICON_LOCATION, SUPPORTED_LANGUAGES } from 'src/app/shared/consts/languages';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();
  selectedLang: string = 'en';
  selectedLangIcon: string = '';
  langMenu: SubMenuItem[] = [];
  constructor(
    private translateService: TranslocoService,
    private menuService: MenuService
  ) {
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }

  ngOnInit(): void {
    this.selectedLang = this.translateService.getActiveLang();
    this.translateService.langChanges$.subscribe(lang => {
      this.selectedLang = lang;
      this.selectedLangIcon = `${FLAG_ICON_LOCATION}/${this.selectedLang}.svg`
      this.langMenu = SUPPORTED_LANGUAGES
        .filter((l) => l != this.selectedLang)
        .map((l) => (
          {
            icon: `${FLAG_ICON_LOCATION}/${l}.svg`,
            label: l,
            onClick$: () => this.changeLang(l)
          }
        ))
    })
  }

  changeLang(lang: string) {
    const newURL = new URL(window.location.href);
    newURL.searchParams.set('lang', lang);
    window.location.href = newURL.toString();
  }
}
