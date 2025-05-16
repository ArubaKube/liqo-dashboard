package models

import (
	liqov1beta1 "github.com/liqotech/liqo/apis/core/v1beta1"
)

// ForeignCluster is a struct that representing a foreign cluster.
type ForeignCluster struct {
	ID                   liqov1beta1.ClusterID           `json:"id"`
	Role                 liqov1beta1.RoleType            `json:"role"`
	APIServerURL         string                          `json:"apiServerUrl"`
	APIServerStatus      liqov1beta1.ConditionStatusType `json:"apiServerStatus"`
	NetworkStatus        liqov1beta1.ConditionStatusType `json:"networkStatus"`
	AuthenticationStatus liqov1beta1.ConditionStatusType `json:"authenticationStatus"`
	OffloadingStatus     liqov1beta1.ConditionStatusType `json:"offloadingStatus"`
	NetworkLatency       string                          `json:"networkLatency"`
	ResourcesOffered     Resources                       `json:"resourcesOffered"`
	ResourcesAcquired    Resources                       `json:"resourcesAcquired"`
}
