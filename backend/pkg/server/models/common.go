package models

import (
	"k8s.io/apimachinery/pkg/api/resource"
)

// Resources represents the resources shared by a cluster or available in a node.
type Resources struct {
	CPU              resource.Quantity `json:"cpu"`
	Memory           resource.Quantity `json:"memory"`
	Pods             resource.Quantity `json:"pods"`
	EphemeralStorage resource.Quantity `json:"ephemeralStorage"`
}
