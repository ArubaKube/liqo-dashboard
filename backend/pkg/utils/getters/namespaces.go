package getters

import (
	"context"

	offloadingv1beta1 "github.com/liqotech/liqo/apis/offloading/v1beta1"
	liqoGetters "github.com/liqotech/liqo/pkg/utils/getters"
	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"github.com/ArubaKube/liqo-dashboard/pkg/server/models"
)

// GetNamespaces returns all the offloaded namespaces in the cluster and some info about whether it is offloaded.
func GetNamespaces(ctx context.Context, cl client.Client) ([]models.Namespace, error) {
	// Get all NamespaceOffloading objects
	var offloadingNsList offloadingv1beta1.NamespaceOffloadingList
	if err := cl.List(ctx, &offloadingNsList); err != nil {
		return nil, err
	}

	offNamespaces := make([]models.Namespace, 0, len(offloadingNsList.Items))

	for i := range offloadingNsList.Items {
		// Get the namespace belonging to the NamespaceOffloading object
		var ns corev1.Namespace
		err := cl.Get(ctx, client.ObjectKey{Name: offloadingNsList.Items[i].Namespace}, &ns)
		switch {
		case client.IgnoreNotFound(err) != nil:
			return nil, err
		case apierrors.IsNotFound(err):
			// The NamespaceOffloading object refers to a namespace that does not exist anymore. We can skip it.
			continue
		default:
			offNamespaces = append(offNamespaces, parseNamespace(&ns, &offloadingNsList.Items[i]))
		}
	}

	return offNamespaces, nil
}

// GetNamespaceByName returns the offloaded namespace with the given name.
func GetNamespaceByName(ctx context.Context, cl client.Client, namespaceName string) (models.Namespace, error) {
	namespace := &corev1.Namespace{}
	if err := cl.Get(ctx, client.ObjectKey{Name: namespaceName}, namespace); err != nil {
		return models.Namespace{}, err
	}

	// Check whether the namespace is offloaded
	offloadingNs, err := liqoGetters.GetOffloadingByNamespace(ctx, cl, namespace.Name)
	if err != nil {
		return models.Namespace{}, err
	}

	parsedNamespace := parseNamespace(namespace, offloadingNs)
	return parsedNamespace, nil
}

// GetOffloadedPodsByNamespaceName returns all the offloaded pods in the given namespace.
func GetOffloadedPodsByNamespaceName(ctx context.Context, cl client.Client, namespaceName string) ([]models.Pod, error) {
	// Check whether the offloaded namespace exists
	_, err := liqoGetters.GetOffloadingByNamespace(ctx, cl, namespaceName)
	if err != nil {
		return nil, err
	}

	podList, err := liqoGetters.ListOffloadedPods(ctx, cl, namespaceName)
	if err != nil {
		return nil, err
	}

	pods := make([]models.Pod, 0, len(podList.Items))
	for i := range podList.Items {
		pods = append(pods, parsePod(&podList.Items[i]))
	}

	return pods, nil
}

func parseNamespace(namespace *corev1.Namespace, offloadingNs *offloadingv1beta1.NamespaceOffloading) models.Namespace {
	return models.Namespace{
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

func parsePod(pod *corev1.Pod) models.Pod {
	var images []string
	for i := range pod.Spec.Containers {
		images = append(images, pod.Spec.Containers[i].Image)
	}

	return models.Pod{
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
