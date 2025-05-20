/**
 * Copyright 2025 ArubaKube S.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
