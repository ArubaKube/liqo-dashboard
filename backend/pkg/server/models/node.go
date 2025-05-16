package models

import liqov1beta1 "github.com/liqotech/liqo/apis/core/v1beta1"

// Node represents a node in the cluster.
type Node struct {
	Name         string                `json:"name"`
	ClusterID    liqov1beta1.ClusterID `json:"clusterID"`
	Capacity     Resources             `json:"capacity"`
	CapacityUsed Resources             `json:"used"`
}
