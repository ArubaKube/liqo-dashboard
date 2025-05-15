package getters

import (
	"context"

	offloadingv1alpha1 "github.com/liqotech/liqo/apis/offloading/v1alpha1"
	liqoGetters "github.com/liqotech/liqo/pkg/utils/getters"
	corev1 "k8s.io/api/core/v1"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"github.com/ArubaKube/liqo-dashboard/pkg/server/models"
)

// GetNamespaces returns all the offloaded namespaces in the cluster and some info about whether it is offloaded.
func GetNamespaces(ctx context.Context, c client.Client) ([]*models.Namespace, error) {
	var namespacesList corev1.NamespaceList
	if err := c.List(ctx, &namespacesList); err != nil {
		return nil, err
	}

	// Get the offloading status of each namespace
	var offloadingNsList offloadingv1alpha1.NamespaceOffloadingList
	offloadingNsMapping := map[string]*offloadingv1alpha1.NamespaceOffloading{}
	if err := c.List(ctx, &offloadingNsList); err != nil {
		return nil, err
	}
	// Create a map to quickly access the offloading status of each namespace
	for i := range offloadingNsList.Items {
		offloadingNsMapping[offloadingNsList.Items[i].Namespace] = &offloadingNsList.Items[i]
	}

	var namespaces []*models.Namespace
	for i := range namespacesList.Items {
		// Get the offloaded namespace from the mapping, if not present provide an empty one
		var offloadingNs *offloadingv1alpha1.NamespaceOffloading
		if offloadingNsInMap, present := offloadingNsMapping[namespacesList.Items[i].Name]; present {
			offloadingNs = offloadingNsInMap
			namespaces = append(namespaces, parseNamespace(&namespacesList.Items[i], offloadingNs))
		}
	}

	if len(namespaces) == 0 {
		namespaces = []*models.Namespace{}
	}
	return namespaces, nil
}

// GetNamespaceByName returns the offloaded namespace with the given name.
func GetNamespaceByName(ctx context.Context, c client.Client, namespaceName string) (*models.Namespace, error) {
	namespace := &corev1.Namespace{}
	if err := c.Get(ctx, client.ObjectKey{Name: namespaceName}, namespace); err != nil {
		return nil, err
	}

	// Check whether the namespace is offloaded
	offloadingNs, err := liqoGetters.GetOffloadingByNamespace(ctx, c, namespace.Name)
	if err != nil {
		return nil, err
	}

	parsedNamespace := parseNamespace(namespace, offloadingNs)
	return parsedNamespace, nil
}

// GetOffloadedPodsByNamespaceName returns all the offloaded pods in the given namespace.
func GetOffloadedPodsByNamespaceName(ctx context.Context, c client.Client, namespaceName string) ([]*models.Pod, error) {
	// Check whether the offloaded namespace exists
	_, err := liqoGetters.GetOffloadingByNamespace(ctx, c, namespaceName)
	if err != nil {
		return nil, err
	}

	podList, err := liqoGetters.ListOffloadedPods(ctx, c, namespaceName)
	if err != nil {
		return nil, err
	}

	var pods []*models.Pod
	for i := range podList.Items {
		pods = append(pods, parsePod(&podList.Items[i]))
	}

	return pods, nil
}

func parseNamespace(namespace *corev1.Namespace, offloadingNs *offloadingv1alpha1.NamespaceOffloading) *models.Namespace {
	return &models.Namespace{
		Name:   namespace.Name,
		Status: namespace.Status.Phase,
		Offloading: models.Offloading{
			NamespaceMappingStrategy: offloadingNs.Spec.NamespaceMappingStrategy,
			PodOffloadingStrategy:    offloadingNs.Spec.PodOffloadingStrategy,
			OffloadingPhase:          offloadingNs.Status.OffloadingPhase,
		},
		CreationTime: namespace.CreationTimestamp.String(),
	}
}

func parsePod(pod *corev1.Pod) *models.Pod {
	var images []string
	for i := range pod.Spec.Containers {
		images = append(images, pod.Spec.Containers[i].Image)
	}

	return &models.Pod{
		Name:          pod.Name,
		Namespace:     pod.Namespace,
		NodeName:      pod.Spec.NodeName,
		Labels:        pod.Labels,
		Status:        pod.Status.Phase,
		RestartPolicy: pod.Spec.RestartPolicy,
		Images:        images,
		CreationTime:  pod.CreationTimestamp.String(),
	}
}
