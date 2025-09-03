# Setup of the Liqo UI on a KinD cluster

The Liqo UI is designed to work on a production-ready cluster, i.e., equipped with an external load balancer and an ingress controller.
The following guide explains how to **locally** set up a minimal cluster, running on KinD, with the Liqo UI reachable through an ingress controller.

## Setup of the Liqo UI on a KinD cluster

Kind does not come with an ingress controller, so we will use the **NGINX Ingress Controller**.

### 1. Create a Kind cluster

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

### 2. Create the Kind cluster

```bash
kind create cluster --name liqo-dashboard --config kind-config.yaml
```

### 3. Deploy the NGINX Ingress Controller

```bash
kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
```

> At this point, it is also a good idea to install the metrics-server if you have not already. Instructions about how to setup a metric server are not provided here.

### 4. Install Liqoctl

Make sure you have liqoctl available on your machine.
To install it, refer to [Liqo documentation](https://docs.liqo.io/en/latest/installation/liqoctl.html).  

For example, on AMD64 linux:

```bash
curl --fail -LS "https://github.com/liqotech/liqo/releases/download/v1.0.1/liqoctl-linux-amd64.tar.gz" | tar -xz
sudo install -o root -g root -m 0755 liqoctl /usr/local/bin/liqoctl
```

### 5. Install Liqo on the KinD cluster

Once you have `liqoctl` installed, deploy liqo on your cluster doing the following:

```bash
liqoctl install kind --cluster-id liqo-dashboard
```

More detailed instructions are available in the [Liqo documentation](https://docs.liqo.io/en/latest/installation/install.html#install-with-liqoctl).

> Optionally, you can install a _second_ cluster and start a peering with it in order to allow the Liqo UI to show more information.

### 6. Configure the hostname

Since we are using an ingress controller, the dashboard will be exposed under the hostname `liqo-dashboard.local`.  
In a real cluster, this would normally be resolved by your DNS.  
On a local KinD cluster, you need to manually map it to `127.0.0.1` by adding the following line to your `/etc/hosts` file (or `C:\Windows\System32\drivers\etc\hosts` in Windows):

```text
127.0.0.1 liqo-dashboard.local
```

### 7. Configure the Liqo UI Helm chart

Uncomment the following line in `deployments/liqo-dashboard/values.yaml` in order to use the Liqo UI through the ingress controller:

```yaml
# ingressClassName: "nginx"
```

### 8. Install the Liqo UI Helm chart

```bash
helm install liqo-dashboard ./deployments/liqo-dashboard -f ./deployments/liqo-dashboard/values.yaml
```

### 9. Connect to the Liqo UI

You can access the UI from the machine on which the cluster is running.
Simply open your browser of choice and go to:

```text
http://liqo-dashboard.local/
```

If the Liqo UI shows up, you are all set.

