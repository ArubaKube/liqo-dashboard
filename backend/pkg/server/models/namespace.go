// Copyright 2025 ArubaKube S.r.l.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package models

import (
	offloadingv1beta1 "github.com/liqotech/liqo/apis/offloading/v1beta1"
	corev1 "k8s.io/api/core/v1"
)

// Offloading represents the offloading status of a namespace.
type Offloading struct {
	NamespaceMappingStrategy offloadingv1beta1.NamespaceMappingStrategyType `json:"namespaceMappingStrategy"`
	PodOffloadingStrategy    offloadingv1beta1.PodOffloadingStrategyType    `json:"podOffloadingStrategy"`
	OffloadingPhase          offloadingv1beta1.OffloadingPhaseType          `json:"offloadingPhase"`
}

// Namespace represents a namespace.
type Namespace struct {
	Name         string                `json:"name"`
	Status       corev1.NamespacePhase `json:"status"`
	CreationTime string                `json:"creationTime"`
	Offloading   Offloading            `json:"offloading"`
}
