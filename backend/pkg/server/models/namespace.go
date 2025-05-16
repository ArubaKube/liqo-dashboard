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
