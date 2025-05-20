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

export interface Cluster {
  id: string;
  role: string;
  apiServerUrl: string;
  apiServerStatus?: string;
  networkStatus?: string;
  authenticationStatus?: string;
  offloadingStatus?: string;
  networkLatency?: string;
  resourcesOffered?: { cpu: string, memory: string, pods: string, "ephemeralStorage": string };
  resourcesAcquired?: { cpu: string, memory: string, pods: string, "ephemeralStorage": string };
}
