package models

// Node represents a node in the cluster.
type Node struct {
	Name         string    `json:"name"`
	Capacity     Resources `json:"capacity"`
	CapacityUsed Resources `json:"used"`
}
