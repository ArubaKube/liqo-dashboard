package models

import (
	"github.com/liqotech/liqo/apis/discovery/v1alpha1"
)

// ForeignCluster is a struct that representing a foreign cluster.
type ForeignCluster struct {
	Name                 string                              `json:"name"`
	ID                   string                              `json:"id"`
	PeeringType          v1alpha1.PeeringType                `json:"peeringType"`
	NetworkStatus        string                              `json:"networkStatus"`
	NetworkLatency       string                              `json:"networkLatency"`
	Resources            Resources                           `json:"resources"`
	AuthenticationStatus string                              `json:"authenticationStatus"`
	APIServerStatus      v1alpha1.PeeringConditionStatusType `json:"apiServerStatus"`
	OutgoingPeering      v1alpha1.PeeringConditionStatusType `json:"outgoingPeering"`
	IncomingPeering      v1alpha1.PeeringConditionStatusType `json:"incomingPeering"`
}
