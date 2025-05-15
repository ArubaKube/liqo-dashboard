package getters

import (
	"context"

	discoveryv1alpha1 "github.com/liqotech/liqo/apis/discovery/v1alpha1"
	liqonetv1alpha1 "github.com/liqotech/liqo/apis/net/v1alpha1"
	liqoResources "github.com/liqotech/liqo/pkg/liqoctl/status/utils/resources"
	foreignClusterUtils "github.com/liqotech/liqo/pkg/utils/foreignCluster"
	liqoGetters "github.com/liqotech/liqo/pkg/utils/getters"
	peeringConditionsUtils "github.com/liqotech/liqo/pkg/utils/peeringConditions"
	corev1 "k8s.io/api/core/v1"
	metricsv1beta1 "k8s.io/metrics/pkg/apis/metrics/v1beta1"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"github.com/ArubaKube/liqo-dashboard/pkg/server/models"
)

// GetForeignClusters returns all the ForeignClusters.
func GetForeignClusters(ctx context.Context, c client.Client) ([]models.ForeignCluster, error) {
	var foreignClusterList discoveryv1alpha1.ForeignClusterList
	if err := c.List(ctx, &foreignClusterList); err != nil {
		return nil, err
	}

	var foreignClusters []models.ForeignCluster
	for i := range foreignClusterList.Items {
		foreignClusters = append(foreignClusters, parseForeignCluster(ctx, c, &foreignClusterList.Items[i]))
	}

	if len(foreignClusters) == 0 {
		foreignClusters = []models.ForeignCluster{}
	}

	return foreignClusters, nil
}

// GetForeignClusterByID returns the ForeignCluster with the given clusterID.
func GetForeignClusterByID(ctx context.Context, c client.Client, clusterID string) (*models.ForeignCluster, error) {
	cluster, err := foreignClusterUtils.GetForeignClusterByID(ctx, c, clusterID)
	if err != nil {
		return nil, err
	}

	parsedForeignCluster := parseForeignCluster(ctx, c, cluster)
	return &parsedForeignCluster, nil
}

// GetVirtualNodesByClusterID returns the VirtualNodes related to the given clusterID.
func GetVirtualNodesByClusterID(ctx context.Context, c client.Client, clusterID string) ([]models.Node, error) {
	cID := &discoveryv1alpha1.ClusterIdentity{
		ClusterID: clusterID,
	}

	nodeList, err := liqoGetters.ListNodesByClusterID(ctx, c, cID)
	if err != nil {
		return nil, err
	}

	var nodes []models.Node
	for i := range nodeList.Items {
		nodes = append(nodes, parseVirtualNode(ctx, c, &nodeList.Items[i]))
	}

	return nodes, nil
}

func parseVirtualNode(ctx context.Context, c client.Client, node *corev1.Node) models.Node {
	var nodeMetrics metricsv1beta1.NodeMetrics

	err := c.Get(ctx, client.ObjectKey{Name: node.Name}, &nodeMetrics)
	if err != nil {
		nodeMetrics = metricsv1beta1.NodeMetrics{}
	}

	return models.Node{
		Name: node.Name,
		Capacity: models.Resources{
			CPU:              *node.Status.Capacity.Cpu(),
			Memory:           *node.Status.Capacity.Memory(),
			Pods:             *node.Status.Capacity.Pods(),
			EphemeralStorage: *node.Status.Capacity.StorageEphemeral(),
		},
		CapacityUsed: models.Resources{
			CPU:              *nodeMetrics.Usage.Cpu(),
			Memory:           *nodeMetrics.Usage.Memory(),
			Pods:             *nodeMetrics.Usage.Pods(),
			EphemeralStorage: *nodeMetrics.Usage.StorageEphemeral(),
		},
	}
}

func parseForeignCluster(ctx context.Context, c client.Client, foreignCluster *discoveryv1alpha1.ForeignCluster) models.ForeignCluster {
	// Get the resources shared with this cluster
	var sharedResources corev1.ResourceList
	switch {
	case foreignClusterUtils.IsOutgoingEnabled(foreignCluster):
		sharedResources, _ = liqoResources.GetAcquiredTotal(ctx, c, foreignCluster.Spec.ClusterIdentity.ClusterID)
	case foreignClusterUtils.IsIncomingEnabled(foreignCluster):
		sharedResources, _ = liqoResources.GetSharedTotal(ctx, c, foreignCluster.Spec.ClusterIdentity.ClusterID)
	}

	// Get the info about the vpn
	vpnInfo, err := liqoGetters.GetTunnelEndpoint(ctx, c, &foreignCluster.Spec.ClusterIdentity, foreignCluster.Status.TenantNamespace.Local)
	if err != nil {
		vpnInfo = &liqonetv1alpha1.TunnelEndpoint{}
	}

	var networkStatus string
	var authStatus string
	var incomingPeering discoveryv1alpha1.PeeringConditionStatusType
	var outgoingPeering discoveryv1alpha1.PeeringConditionStatusType

	for _, condition := range foreignCluster.Status.PeeringConditions {
		switch condition.Type { //nolint:exhaustive // no need to iterate over all the conditions.
		case "OutgoingPeering":
			outgoingPeering = condition.Status
		case "IncomingPeering":
			incomingPeering = condition.Status
		case "AuthenticationStatus":
			authStatus = string(condition.Status)
		case "NetworkStatus":
			networkStatus = string(condition.Status)
		}
	}

	// Get the API Server status
	apiServerStatus := peeringConditionsUtils.GetStatus(foreignCluster, discoveryv1alpha1.APIServerStatusCondition)

	return models.ForeignCluster{
		Name:           foreignCluster.Name,
		ID:             foreignCluster.Spec.ClusterIdentity.ClusterID,
		PeeringType:    foreignCluster.Spec.PeeringType,
		NetworkLatency: vpnInfo.Status.Connection.Latency.Value,
		Resources: models.Resources{
			CPU:              *sharedResources.Cpu(),
			Memory:           *sharedResources.Memory(),
			Pods:             *sharedResources.Pods(),
			EphemeralStorage: *sharedResources.StorageEphemeral(),
		},
		NetworkStatus:        networkStatus,
		APIServerStatus:      apiServerStatus,
		AuthenticationStatus: authStatus,
		OutgoingPeering:      outgoingPeering,
		IncomingPeering:      incomingPeering,
	}
}
