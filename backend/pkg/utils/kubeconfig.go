package utils

import (
	"fmt"

	discoveryv1alpha1 "github.com/liqotech/liqo/apis/discovery/v1alpha1"
	netv1alpha1 "github.com/liqotech/liqo/apis/net/v1alpha1"
	offloadingv1alpha1 "github.com/liqotech/liqo/apis/offloading/v1alpha1"
	sharingv1alpha1 "github.com/liqotech/liqo/apis/sharing/v1alpha1"
	virtualkubeletv1alpha1 "github.com/liqotech/liqo/apis/virtualkubelet/v1alpha1"
	"k8s.io/apimachinery/pkg/runtime"
	utilruntime "k8s.io/apimachinery/pkg/util/runtime"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	metricsv1beta1 "k8s.io/metrics/pkg/apis/metrics/v1beta1"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/client/config"
)

var (
	scheme = runtime.NewScheme()
)

func init() {
	utilruntime.Must(metricsv1beta1.AddToScheme(scheme))
	utilruntime.Must(clientgoscheme.AddToScheme(scheme))
	utilruntime.Must(discoveryv1alpha1.AddToScheme(scheme))
	utilruntime.Must(netv1alpha1.AddToScheme(scheme))
	utilruntime.Must(offloadingv1alpha1.AddToScheme(scheme))
	utilruntime.Must(sharingv1alpha1.AddToScheme(scheme))
	utilruntime.Must(virtualkubeletv1alpha1.AddToScheme(scheme))
}

// GetClient returns a new client.Client.
func GetClient() (client.Client, error) {
	cfg, err := config.GetConfig()

	if err != nil {
		return nil, err
	}

	oClient, err := client.New(cfg, client.Options{Scheme: scheme})
	if err != nil {
		return nil, fmt.Errorf("error creating cr client: %w", err)
	}

	return oClient, nil
}
