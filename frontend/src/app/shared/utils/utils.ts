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

import { Cluster } from "src/app/modules/cluster/models/cluster";
import { LiqoModuleStatus, PeeringStatus } from "../consts/peering";

export const getPeeringStatus = (cluster: Cluster): PeeringStatus => {
    if ([
        cluster.apiServerStatus,
        cluster.networkStatus,
        cluster.authenticationStatus,
        cluster.offloadingStatus,
    ].some((s) => s === LiqoModuleStatus.PENDING)) {
        return PeeringStatus.PENDING;
    } else if ([
        cluster.apiServerStatus,
        cluster.networkStatus,
        cluster.authenticationStatus,
        cluster.offloadingStatus,
    ].some((s) => ![LiqoModuleStatus.NONE, LiqoModuleStatus.ESTABLISHED, LiqoModuleStatus.READY].includes(s as LiqoModuleStatus))) {
        console.log(cluster);
        return PeeringStatus.ERROR;
    } else if ([
        cluster.apiServerStatus,
        cluster.networkStatus,
        cluster.authenticationStatus,
        cluster.offloadingStatus,
    ].every((s) => s === LiqoModuleStatus.NONE)) {
        return PeeringStatus.NONE;
    }
    return PeeringStatus.READY;
}