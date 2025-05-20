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

export const DEFAULT_LANGUAGE = 'en';
export const FLAG_ICON_LOCATION = 'assets/icons/langs';

// The list of supported languages. For each languages there should be:
// - A json translation file inside the `src/assets/i18n` directory
// - An icon for the language in `src/assets/icons/langs` (the path specified in the FLAG_ICON_LOCATION constant)
export const SUPPORTED_LANGUAGES = [
    'en',
    'it'
]