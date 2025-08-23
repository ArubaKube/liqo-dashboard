# Liqo UI Frontend
This project is a UI for Liqo made by ArubaKube.
## Features
- Show a graph with the topology of the federation created by liqo
- Show the status of the active peerings with other clusters
- Show the status of the offloaded namespaces in the local liqo node
- Show the status of the pods running in the offloaded namespaces
![A screenshot of the UI](./docs/screenshot.png)
## Installation
You can install this UI via the [provided Helm Chart](./deployments/).
1. Clone this repository:
    ```bash
    https://github.com/ArubaKube/liqo-dashboard.git
    cd liqo-dashboard
    ```
2. Prerequisites
    - A running cluster with Liqo installed
    - [Metrics server](https://github.com/kubernetes-sigs/metrics-server) installed on the cluster
    - [Helm](https://helm.sh/docs/intro/install/) utility installed on your machine
3. Install the chart

    ```bash
    helm install my-release ./deployments/liqo-dashboard
    ```

## Quick Test

The Liqo UI is designed to work on a production-ready cluster (e.g., equipped with an external load balancer and an ingress controller). The following guide explains how to set up a minimal running configuration using an ingress controller.

### Using KinD

Kind does not come with an ingress controller, so we will use the **NGINX Ingress Controller**.

1. **Create the Kind cluster configuration**

Create a file named `kind-config.yaml` with the following content:

```yaml
# kind-config.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
      - containerPort: 443
        hostPort: 443
```

2. **Create the cluster**

```bash
kind create cluster --name liqo-dashboard --config kind-config.yaml
```

3. **Deploy the NGINX Ingress Controller**

```bash
kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
```

> At this point, it’s also a good idea to install the metrics-server if you haven’t already.

4. **Install Liqo**

```bash
liqoctl install kind --cluster-id liqo-dashboard
```

> Optionally, start peering with a second cluster if needed.

5. **Configure the hostname**

Add the following line to `/etc/hosts`:

```
127.0.0.1 liqo-dashboard.local
```

6. **Configure the Helm chart**

Uncomment the following line in `deployments/liqo-dashboard/values.yaml`:

```yaml
# ingressClassName: "nginx"
```

7. **Install the Helm chart**

```bash
helm install liqo-dashboard ./deployments/liqo-dashboard -f ./deployments/liqo-dashboard/values.yaml
```

8. **Access the UI**

Open your browser and go to:

```
http://liqo-dashboard.local/
```