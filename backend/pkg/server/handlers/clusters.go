package handlers

import (
	"log"

	"github.com/gin-gonic/gin"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"

	"github.com/ArubaKube/liqo-dashboard/pkg/utils/getters"
)

// GetV1Clusters implements the `GET /v1/clusters` route, returning all the peered clusters.
func (s Server) GetV1Clusters(c *gin.Context) {
	foreignClusters, err := getters.GetForeignClusters(c, s.oClient)
	if err != nil {
		log.Printf("Error listing ForeignClusters: %v", err)
		c.JSON(500, gin.H{"error": "Unable to retrieve the list of clusters"})
		return
	}

	c.JSON(200, foreignClusters)
}

// GetV1ClustersId implements the `GET /v1/clusters/:id` route, returning the cluster with the given clusterID.
func (s Server) GetV1ClustersId(c *gin.Context, clusterID string) { //nolint:revive // function name is generated
	foreignCluster, err := getters.GetForeignClusterByID(c, s.oClient, clusterID)
	switch {
	case k8serrors.IsNotFound(err):
		c.JSON(404, gin.H{"error": "Cluster not found"})
	case err != nil:
		log.Printf("Error getting the ForeignClusters: %v", err)
		c.JSON(500, gin.H{"error": "Unable to retrieve the cluster"})
	default:
		c.JSON(200, foreignCluster)
	}
}

// GetV1ClustersIdNodes implements the `GET /v1/clusters/:id/node` route, returning all the virtual nodes for a cluster.
func (s Server) GetV1ClustersIdNodes(c *gin.Context, clusterID string) { //nolint:revive // function name is generated
	nodes, err := getters.GetVirtualNodesByClusterID(c, s.oClient, clusterID)
	switch {
	case k8serrors.IsNotFound(err):
		c.JSON(404, gin.H{"error": "Cluster not found"})
	case err != nil:
		log.Printf("Error getting the nodes: %v", err)
		c.JSON(500, gin.H{"error": "Unable to retrieve the list of nodes"})
	default:
		c.JSON(200, nodes)
	}
}
