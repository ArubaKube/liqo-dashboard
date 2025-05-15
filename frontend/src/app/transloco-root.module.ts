import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  provideTransloco,
  TranslocoModule,
  TranslocoService
} from '@jsverse/transloco';
import { environment } from '../environments/environment';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './shared/consts/languages';
import { TranslocoHttpLoader } from './transloco-loader';


export function preloadDefaultLang(transloco: TranslocoService) {
  return function () {
    const url = new URL(window.location.href);
    let userLang = (url.searchParams.get('lang') || DEFAULT_LANGUAGE).toLocaleLowerCase();
    if (!SUPPORTED_LANGUAGES.includes(userLang)) {
      userLang = DEFAULT_LANGUAGE;
    }
    transloco.setActiveLang(userLang);
    return transloco.load(userLang);
  };
}
@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: SUPPORTED_LANGUAGES,
        defaultLang: DEFAULT_LANGUAGE,
        reRenderOnLangChange: true,
        prodMode: environment.production,
      },
      loader: TranslocoHttpLoader
    }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [TranslocoService],
      useFactory: preloadDefaultLang,
    },
  ],
})

export class TranslocoRootModule { }
