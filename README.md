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

## Quick test

The Liqo UI has been designed to work on a production-ready cluster, e.g., equipped with an external load balancer and an ingress controller.
However, if you would like to make a quick test of this software on a 'toy' cluster, we can suggest the following setup:

- Install a Kubernetes cluster (e.g., K3s with the default install)
- Install Liqo and possibly start a peering with another cluster
- Modify the `/etc/hosts` file (or `C:\Windows\system32\drivers\etc\hosts` in Windows) the computer where you will run the browser that connects to the Liqo UI and add an entry that maps the `liqo-dashboard.local` host with the IP address of the machine where you kubernetes cluster is running (e.g., `KUBERNETES_HOST_IP_ADDRESS    liqo-dashboard.local`)
- Change the type of service offered by the cluster from ClusterIP to NodePort. To do this, type `kubectl edit svc SERVICE_NAME -n NAMESPACE --context CLUSTER_CONTEXT` and edit `type: ClusterIP` in `type: NodePort`
(e.g. `kubectl edit svc my-release-liqo-dashboard-frontend -n default --context kind-rome`)
- Launch a browser and connect to the Liqo UI using the following URL: `http://liqo-dashboard.local:TCP_FRONTEND_PORT`, where `TCP_FRONTEND_PORT` is the port of the cluster running the dashboard. 
