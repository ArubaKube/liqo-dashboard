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

export enum LiqoModuleStatus {
    PENDING = 'Pending',
    ESTABLISHED = 'Established',
    ERROR = 'Error',
    NONE = 'None',
    READY = 'Ready',
    NOT_READY = 'NotReady',
    SOME_NOT_READY = 'SomeNotReady',
}

export enum Role {
    CONSUMER = 'Consumer',
    PROVIDER = 'Provider',
    CONSUMER_AND_PROVIDER = 'ConsumerAndProvider',
    UNKNOWN = 'Unknown'
}

export enum PeeringStatus {
    READY = 'Ready',
    PENDING = 'Pending',
    ERROR = 'Error',
    NONE = 'None'
}

export const PEER_SUCCESS_ICON = 'image:///assets/icons/liqo/node-success.svg';
export const PEER_ERROR_ICON = 'image:///assets/icons/liqo/node-error.svg';
export const PEER_WARNING_ICON = 'image:///assets/icons/liqo/node-warning.svg';