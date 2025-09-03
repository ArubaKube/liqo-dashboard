# Setup of the Liqo UI on a KinD cluster

The Liqo UI is designed to work on a production-ready cluster, i.e., equipped with an external load balancer and an ingress controller.
The following guide explains how to **locally** set up a minimal cluster, running on KinD, with the Liqo UI reachable through an ingress controller.

### 1. Create a Kind cluster

Create a new Kind cluster with `extraPortMappings` to allow the local host to forward the requests to the cluster Ingress controller over ports 80/443:

```sh
cat <<EOF | kind create cluster --name liqo-dashboard --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP
EOF
```

### 3. Deploy the NGINX Ingress Controller

```bash
kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
```

> At this point, it is also a good idea to install the metrics-server if you have not already. You can check [here](https://github.com/kubernetes-sigs/metrics-server?tab=readme-ov-file#installation) how to install it.

### 4. Install Liqoctl

Make sure you have liqoctl available on your machine.
To install it, refer to [Liqo documentation](https://docs.liqo.io/en/latest/installation/liqoctl.html).  

For example, on AMD64 linux:

```bash
ARCH=amd64
curl --fail -LS "https://github.com/liqotech/liqo/releases/download/$(curl https://api.github.com/repos/liqotech/liqo/releases/latest | jq -r .tag_name)/liqoctl-linux-$ARCH.tar.gz" | tar -xz
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

By default, the dashboard will be exposed under the hostname `liqo-dashboard.local`.  
In a real cluster, this would normally be resolved by your DNS.  
On a local KinD cluster, you need to manually map it to `127.0.0.1` by adding the following line to your `/etc/hosts` file (or `C:\Windows\System32\drivers\etc\hosts` in Windows):

```text
127.0.0.1 liqo-dashboard.local
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

