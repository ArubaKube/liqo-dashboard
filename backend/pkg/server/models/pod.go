package models

import v1 "k8s.io/api/core/v1"

// Pod represents a pod in the cluster.
type Pod struct {
	Name          string            `json:"name"`
	Namespace     string            `json:"namespace"`
	NodeName      string            `json:"nodeName"`
	Labels        map[string]string `json:"labels"`
	Status        v1.PodPhase       `json:"status"`
	RestartPolicy v1.RestartPolicy  `json:"restartPolicy"`
	Images        []string          `json:"images"`
	CreationTime  string            `json:"creationTime"`
}
