package handlers

import (
	"log"

	"github.com/gin-gonic/gin"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"

	"github.com/ArubaKube/liqo-dashboard/pkg/utils/getters"
)

// GetV1Namespaces implements the `GET /v1/namespaces` route, returning all the namespaces in the cluster.
func (s Server) GetV1Namespaces(c *gin.Context) {
	namespaces, err := getters.GetNamespaces(c, s.oClient)
	if err != nil {
		log.Printf("Error while listing Namespaces: %v", err)
		c.JSON(500, gin.H{"error": "Unable to retrieve the list of namespaces"})
		return
	}

	c.JSON(200, namespaces)
}

// GetV1NamespacesName implements the `GET /v1/namespaces/:name` route, returning the offloaded namespace with the given name.
func (s Server) GetV1NamespacesName(c *gin.Context, name string) {
	namespace, err := getters.GetNamespaceByName(c, s.oClient, name)
	switch {
	case k8serrors.IsNotFound(err):
		c.JSON(404, gin.H{"error": "Namespace not found"})
	case err != nil:
		log.Printf("Error getting a the namespace: %v", err)
		c.JSON(500, gin.H{"error": "Unable to retrieve the namespace"})
	default:
		c.JSON(200, namespace)
	}
}

// GetV1NamespacesNameOffloaded implements the `GET /v1/namespaces/:name/offloaded` route, returning the offloaded pods within
// the namespace with the given name.
func (s Server) GetV1NamespacesNameOffloaded(c *gin.Context, name string) {
	pods, err := getters.GetOffloadedPodsByNamespaceName(c, s.oClient, name)
	switch {
	case k8serrors.IsNotFound(err):
		c.JSON(404, gin.H{"error": "Namespace not found"})
	case err != nil:
		log.Printf("Error getting the offloaded pods: %v", err)
		c.JSON(500, gin.H{"error": "Unable to retrieve the list of offloaded pods"})
	default:
		c.JSON(200, pods)
	}
}
