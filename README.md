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
However, if you would like to make a quick test of this software on a 'toy' cluster, which has neither a _load balancer_ not an _ingress controller_, we can suggest the following setup:

- Install a Kubernetes cluster (e.g., K3s with the default install)
- Install Liqo and possibly start a peering with another cluster
- Update the following parameters in the Liqo UI Helm chart:
  - `backend.service.type`: `NodePort`
  - `frontend.service.type`: `NodePort`
- Install the Liqo UI with Helm, using the above values
- Now the Liqo UI should be running on your cluster, but the parameters are not yet correct. Check which TCP ports have been assigned to the two NodePort services you have created (for the backend and the frontend) (e.g., `kubectl get svc --all-namespaces |grep NodePort`)
- Update the following parameters in the Liqo UI Helm chart:
  - `frontend.service.port`: use the TCP port assigned to the NodePort of the frontend
  - `backend.service.port`: use the TCP port assigned to the NodePort of the backend
  - `frontend.appConfig.api.url`: use the following URL: `http://liqo-dashboard.local:TCP_FRONTEND_PORT/v1/api` where the `TCP_FRONTEND_PORT` is the TCP port assigned to the NodePort frontend service (e.g., 32075)
- Update the new values to the existing Liqo UI install, using the `helm upgrade` command (e.g. `helm upgrade my-release ./deployments/liqo-dashboard`)
- Modify the `/etc/hosts` file (or `C:\Windows\system32\drivers\etc\hosts` in Windows) the computer where you will run the browser that connects to the Liqo UI and add an entry that maps the `liqo-dashboard.local` host with the IP address of the machine where you kubernetes cluster is running (e.g., `KUBERNETES_HOST_IP_ADDRESS    liqo-dashboard.local`)
- Launch a browser and connect to the Liqo UI using the following URL: `http://liqo-dashboard.local:TCP_FRONTEND_PORT`
