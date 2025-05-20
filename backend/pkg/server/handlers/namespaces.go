// Copyright 2025 ArubaKube S.r.l.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
